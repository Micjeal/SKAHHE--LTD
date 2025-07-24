require('dotenv').config();
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate text using OpenAI's GPT model
 * @param {string} prompt - The input prompt for the AI
 * @param {Object} options - Additional options for the generation
 * @returns {Promise<string>} - The generated text
 */
async function generateText(prompt, options = {}) {
  try {
    const defaultOptions = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: 150,
      temperature: 0.7,
      ...options
    };

    const response = await openai.chat.completions.create({
      ...defaultOptions,
      ...options
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating text with OpenAI:', error);
    throw error;
  }
}

/**
 * Generate an image using DALL-E
 * @param {string} prompt - The description of the image to generate
 * @param {Object} options - Additional options for the image generation
 * @returns {Promise<string>} - The URL of the generated image
 */
async function generateImage(prompt, options = {}) {
  try {
    const defaultOptions = {
      n: 1,
      size: '1024x1024',
      response_format: 'url',
      ...options
    };

    const response = await openai.images.generate({
      prompt,
      ...defaultOptions
    });

    return response.data[0].url;
  } catch (error) {
    console.error('Error generating image with DALL-E:', error);
    throw error;
  }
}

module.exports = {
  generateText,
  generateImage,
  openai // Export the openai instance for direct access if needed
};
