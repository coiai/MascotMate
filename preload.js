const { contextBridge } = require('electron');
const axios = require('axios');

const apiKey = '';

contextBridge.exposeInMainWorld('chatGpt', {
  generateText: async function (prompt) {
    try {
      const response = await axios.post(`https://api.openai.com/v1/completions`, {
        prompt: `Q: ${prompt}\nA:`,
        model: 'text-davinci-003',
        max_tokens: 10,
        n: 1,
        stop: ['\n'],
        temperature: 0.5,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey,
        }
      });
      return response.data.choices[0].text;
    } catch (error) {
      console.error(error)
      return 'An error occurred while sending your message.';
    }
  }
});