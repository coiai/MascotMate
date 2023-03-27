const axios = require('axios')
const { ipcRenderer } = require('electron');

const chatDiv = document.getElementById('chat')

window.addEventListener('DOMContentLoaded', () => {
  const mascot = document.querySelector('img');
  mascot.addEventListener('click', () => {
    ipcRenderer.send('mascot-click');
  });
});

// メッセージをレンダラープロセスに送信
ipcRenderer.on('mascot-message', (event, message) => {
  ipcRenderer.sendToHost('message', message);
});

// メインプロセスからの応答を処理する
ipcRenderer.on('message', (event, message) => {
  // メッセージをログに出力する
  console.log(`Received message: ${message}`);
});

// mascot要素がクリックされた時にメッセージを送信する
const mascot = document.querySelector('img');
mascot.addEventListener('click', () => {
  sendMessage('Hello from the renderer process!');
});

// チャットの送信ボタンがクリックされたときに実行する関数
function sendMessage () {
  const messageInput = document.getElementById('message-input')
  const message = messageInput.value

  // チャットの送信リクエストを作成する
  const request = {
    input: message,
    context: []
  }

  // ChatGPT APIに対してチャットの送信リクエストを送信する
  axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
    prompt: `chat with GPT-3: ${JSON.stringify(request)}`,
    max_tokens: 1024,
    n: 1,
    stop: '\n',
    temperature: 0.7
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }
  })
  .then((response) => {
    // ChatGPT APIからのレスポンスからチャットの応答を取得する
    const chatResponse = response.data.choices[0].text

    // チャットの応答を画面に表示する
    const chatResponseDiv = document.createElement('div')
    chatResponseDiv.className = 'chat-response'
    chatResponseDiv.textContent = chatResponse
    chatDiv.appendChild(chatResponseDiv)

    // チャット入力欄をクリアする
    messageInput.value = ''
  })
  .catch((error) => {
    console.error(error)
  })
}

// チャットの送信ボタンのクリックイベントを登録する
const sendButton = document.getElementById('send-button')
sendButton.addEventListener('click', sendMessage)
