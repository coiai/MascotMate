const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // preload: path.join(__dirname, 'preload.js')
    }
  })

  // ウィンドウに表示するHTMLファイルを指定する
  mainWindow.loadFile('index.html')

  // デバッグ用のDevToolsを開く
  mainWindow.webContents.openDevTools()

  // スコットがクリックされたときに mascot-click イベントをリッスンし、mainWindow にメッセージを送信します。
  ipcMain.on('mascot-click', (event) => {
    mainWindow.webContents.send('mascot-message', 'Hello from the main process!');
  });
}

// アプリケーションが起動したらウィンドウを作成する
app.whenReady().then(createWindow)

// 全てのウィンドウが閉じたらアプリケーションを終了する
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
