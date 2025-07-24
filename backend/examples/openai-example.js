const { generateText, generateImage } = require('../openai-utils');

async function runExamples() {
  try {
    // Example 1: Generate text
    console.log('Generating text...');
    const textResponse = await generateText(
      'Write a short poem about artificial intelligence'
    );
    console.log('Generated Text:', textResponse);
    
    // Example 2: Generate image (commented out as it consumes credits)
    /*
    console.log('\nGenerating image...');
    const imageUrl = await generateImage(
      'a futuristic robot painting a landscape, digital art'
    );
    console.log('Generated Image URL:', imageUrl);
    */
    
  } catch (error) {
    console.error('Error in examples:', error);
  }
}

// Run the examples
runExamples();
