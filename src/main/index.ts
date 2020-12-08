import { app, BrowserWindow } from "electron";
import path from "path";

// セキュアな Electron の構成
// 参考: https://qiita.com/pochman/items/64b34e9827866664d436

const createWindow = async (): Promise<void> => {
  // レンダープロセスとなる、ウィンドウオブジェクトを作成する。
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
    },
  });
  console.log("in file");
  await mainWindow.loadFile(path.join(__dirname, "dist/index.html"));

  // 開発者ツールの起動
  mainWindow.webContents.openDevTools();
};

// 全てのウィンドウが閉じた時の処理
app.on("window-all-closed", () => {
  // macOS 以外では、メインプロセスを停止する
  // macOS では、ウインドウが閉じてもメインプロセスは停止せず
  // ドックから再度ウインドウが表示されるようにする。
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", async () => {
  // macOS では、ウインドウが閉じてもメインプロセスは停止せず
  // ドックから再度ウインドウが表示されるようにする。
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});

// Electronの起動準備が終わったら、ウィンドウを作成する。
app.whenReady().then(createWindow);
