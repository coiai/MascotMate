const { ipcRenderer } = require('electron');

const messagesContainer = document.getElementById('messages');

ipcRenderer.on('message', (event, message) => {
  const messageEl = document.createElement('div');
  messageEl.innerText = message;
  messagesContainer.appendChild(messageEl);
});
