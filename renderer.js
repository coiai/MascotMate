const messageForm = document.getElementById('message-form');
const promptInput = document.getElementById('message-input');
const messages = document.getElementById('messages');

const addMessage = (message) => {
  const messageElem = document.createElement('div');
  messageElem.textContent = message;
  messages.appendChild(messageElem);
};

messageForm.addEventListener('submit', async (event) => {
  event.preventDefault();  
  const prompt = promptInput.value;
  promptInput.value = '';
  addMessage(`You: ${prompt}`);
  const generatedText = await window.chatGpt.generateText(prompt);
  addMessage(generatedText);
});
