const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messages = document.getElementById('messages');

const addMessage = (message) => {
  const messageElem = document.createElement('div');
  messageElem.textContent = message;
  messages.appendChild(messageElem);
};

const sendMessage = async (message) => {
  addMessage(`You: ${message}`);
  messageInput.value = '';

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: `Q: ${message}\nA:`,
      max_tokens: 150,
      n: 1,
      stop: ['\n'],
      temperature: 0.5,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '', // OpenAI API Keyを入力してください
      }
    });
    const answer = response.data.choices[0].text.trim();
    addMessage(`Chatbot: ${answer}`);
  } catch (error) {
    console.error(error);
    addMessage('An error occurred while sending your message.');
  }
};

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = messageInput.value;
  if (message) {
    sendMessage(message);
  }
});
