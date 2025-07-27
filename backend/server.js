require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { generateText, generateImage } = require('./openai-utils');

const app = express();
const PORT = process.env.PORT || 5000;

// Check if OpenAI is properly configured
const OPENAI_ENABLED = !!process.env.OPENAI_API_KEY;

// Log AI provider status on server start
console.log('AI Provider Status:');
console.log(`- OpenAI: ${OPENAI_ENABLED ? 'Configured' : 'Not Configured'}`);

if (!OPENAI_ENABLED) {
    console.error('ERROR: OPENAI_API_KEY is not properly configured in the .env file');
    process.exit(1);
}

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
      if (!OPENAI_ENABLED) {
        throw new Error('OpenAI is not properly configured. Please check your API key in the .env file');
      }
      
      const aiResponse = await generateOpenAIResponse(query);
      
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

// Common responses for when OpenAI is unavailable
const FALLBACK_RESPONSES = {
  'hello': 'Hello! Thanks for reaching out to Skahhe Travel Care. How can I assist you with your travel plans today?',
  'hi': 'Hi there! Welcome to Skahhe Travel Care. How can I help you with your travel needs?',
  'help': 'I can help you with:\\n- Car rental information\\n- Tour packages\\n- Pricing and availability\\n- Booking assistance\\n\nPlease let me know what you need help with!',
  'contact': 'You can reach us at:\\n📞 Phone: +256 775 346 164\\n📧 Email: info@skahhe.com\\n📍 Location: Kampala, Uganda',
  'services': 'We offer:\\n🚗 Self-drive car hire\\n🚙 Chauffeur services\\n🌍 Tour packages\\n✈️ Airport transfers\\n\nWhat would you like to know more about?'
};

// Function to find the best matching fallback response
function getFallbackResponse(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  // Check for exact matches first
  for (const [key, response] of Object.entries(FALLBACK_RESPONSES)) {
    if (lowerPrompt.includes(key)) {
      return response;
    }
  }
  
  // Check for partial matches
  for (const [key, response] of Object.entries(FALLBACK_RESPONSES)) {
    const words = key.split(' ');
    if (words.some(word => lowerPrompt.includes(word))) {
      return response;
    }
  }
  
  // Default fallback
  return 'I apologize, but I\'m having trouble connecting to our AI service at the moment. ' +
         'Please try again later or contact us directly at info@skahhe.com for assistance.';
}

// Function to generate AI response using OpenAI
async function generateOpenAIResponse(prompt) {
  try {
    const response = await generateText(prompt, {
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 200
    });
    return response;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // If we hit rate limits or other errors, use fallback
    if (error.status === 429 || error.status === 500) {
      console.log('Using fallback response due to API error');
      return getFallbackResponse(prompt);
    }
    
    // For other errors, provide a helpful message
    if (error.status === 401) {
      throw new Error('Invalid OpenAI API key. Please check your configuration in the .env file');
    } else if (error.response?.data?.error?.message) {
      return getFallbackResponse(prompt);
    } else {
      return getFallbackResponse(prompt);
    }
  }
}

// Serve static files from the root directory
const path = require('path');
app.use(express.static(path.join(__dirname, '..')));

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Frontend is available at http://localhost:${PORT}/index.html`);
});
