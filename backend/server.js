require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { generateText, generateImage } = require('./openai-utils');

const app = express();
const PORT = process.env.PORT || 5000;

// AI Provider Configuration
const HUGGING_FACE_API = 'https://api-inference.huggingface.co/models/google/gemma-7b-it';
const HUGGING_FACE_KEY = process.env.HUGGING_FACE_KEY || '';
const OPENAI_ENABLED = !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here';

// Log AI provider status on server start
console.log(`AI Providers Status:`);
console.log(`- Hugging Face: ${HUGGING_FACE_KEY ? 'Configured' : 'Not Configured'}`);
console.log(`- OpenAI: ${OPENAI_ENABLED ? 'Configured' : 'Not Configured'}`);

// Middleware
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Chatbot Search API' });
});

// Search endpoint - Supports multiple AI providers
app.post('/api/search', async (req, res) => {
  console.log('Received search request with body:', req.body);
  
  try {
    const { query, provider = 'openai' } = req.body;
    
    if (!query) {
      console.log('No query provided in request');
      return res.status(400).json({ 
        success: false,
        error: 'Search query is required' 
      });
    }

    console.log(`Processing search query with ${provider.toUpperCase()}:`, query);
    
    try {
      let aiResponse;
      
      switch(provider.toLowerCase()) {
        case 'openai':
          if (!OPENAI_ENABLED) {
            throw new Error('OpenAI is not properly configured');
          }
          aiResponse = await generateOpenAIResponse(query);
          break;
          
        case 'huggingface':
          if (!HUGGING_FACE_KEY) {
            throw new Error('Hugging Face is not properly configured');
          }
          aiResponse = await generateHuggingFaceResponse(query);
          break;
          
        default:
          throw new Error('Unsupported AI provider. Please use "openai" or "huggingface"');
      }
      
      console.log('Successfully generated AI response');
      
      res.json({
        success: true,
        provider,
        query,
        aiResponse,
        results: []
      });
      
    } catch (error) {
      console.error(`${provider.toUpperCase()} API Error:`, error);
      return res.status(500).json({
        success: false,
        error: `Failed to process your search with ${provider}: ${error.message}`,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'An error occurred while processing your search' 
    });
  }
});

// New endpoint for image generation with DALL-E
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, size = '1024x1024' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        success: false,
        error: 'Image prompt is required' 
      });
    }
    
    if (!OPENAI_ENABLED) {
      return res.status(400).json({
        success: false,
        error: 'OpenAI is not properly configured for image generation'
      });
    }
    
    console.log('Generating image with prompt:', prompt);
    const imageUrl = await generateImage(prompt, { size });
    
    res.json({
      success: true,
      imageUrl,
      prompt,
      size
    });
    
  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate image',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Function to generate AI response using OpenAI
async function generateOpenAIResponse(prompt) {
  try {
    console.log('Sending request to OpenAI API...');
    const response = await generateText(prompt, {
      model: 'gpt-3.5-turbo',
      max_tokens: 300,
      temperature: 0.7
    });
    return response;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

// Function to generate AI response using Hugging Face's free model
async function generateHuggingFaceResponse(prompt) {
  try {
    console.log('Sending request to Hugging Face API...');
    
    const response = await axios.post(
      HUGGING_FACE_API,
      {
        inputs: `You are a helpful assistant for Skahhe Travel Care. Provide a concise and accurate response to the following query: "${prompt}"`,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Received response from Hugging Face API');
    
    // Extract and return the generated text
    const generatedText = response.data[0]?.generated_text || 'I apologize, but I am unable to generate a response at the moment.';
    return generatedText;
    
  } catch (error) {
    console.error('AI Generation Error Details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      stack: error.stack
    });
    
    // Provide a fallback response
    if (error.response?.status === 503) {
      return 'The AI service is currently loading. Please try again in a few moments.';
    }
    
    return 'I apologize, but I am having trouble connecting to the AI service at the moment. Please try again later.';
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
