const path = require("path");
const { merge } = require("webpack-merge");

const appConfig = {
  // Electronのレンダラプロセスで動作することを指定する
  target: "electron-renderer",
  // 起点となるファイル
  entry: path.resolve(__dirname, "/src/renderer/index.tsx"),
  // webpack watch したときに差分ビルドができる
  cache: true,
  // development は、 source map file を作成、再ビルド時間の短縮などの設定となる
  // production は、コードの圧縮やモジュールの最適化が行われる設定となる
  mode: "development", // "production" | "development" | "none"
  // 出力先設定 __dirname は node でのカレントディレクトリのパスが格納される変数
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  // ファイルタイプ毎の処理を記述する
  module: {
    rules: [
      {
        // コンパイルの事前に eslint による
        // 拡張子 .ts または .tsx の場合
        test: /\.tsx?$/,
        // 事前処理であることを示す
        enforce: "pre",
        // TypeScript をコードチェックする
        loader: "eslint-loader",
      },
      {
        // 正規表現で指定する
        // 拡張子 .ts または .tsx の場合
        test: /\.tsx?$/,
        // ローダーの指定
        // TypeScript をコンパイルする
        use: "ts-loader",
      },
    ],
  },
  // 処理対象のファイルを記載する
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"), // rootPath にはルートのパスが入る。
    },
    extensions: [
      ".ts",
      ".tsx",
      ".js", // node_modulesのライブラリ読み込みに必要
    ],
  },
};

const developmentConfig = {
  output: {
    publicPath: "http://localhost:8080/",
  },
  devtool: "eval-source-map",
};

const productionConfig = {
  output: {
    publicPath: "/",
  },
};

module.exports = merge(
  appConfig,
  process.env.NODE_ENV === "production" ? productionConfig : developmentConfig
);
