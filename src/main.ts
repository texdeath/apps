import { app, BrowserWindow } from "electron";

// セキュアな Electron の構成
// 参考: https://qiita.com/pochman/items/64b34e9827866664d436

const createWindow = async (): Promise<void> => {
  // レンダープロセスとなる、ウィンドウオブジェクトを作成する。
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
    },
  });
  // tscでコンパイルする際の出力先（相対パス）
  await win.loadFile("./index.html");
  // 開発者ツールの起動
  win.webContents.openDevTools();
  // Hot Reload
  require("electron-reload")(__dirname, {
    electron: require("${__dirname}/../../node_modules/electron"),
    forceHardReset: true,
    hardResetMethod: "exit",
  });
};

// Electronの起動準備が終わったら、ウィンドウを作成する。
app.whenReady().then(createWindow);

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
