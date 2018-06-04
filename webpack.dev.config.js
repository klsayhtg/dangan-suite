var webpack = require('webpack');
var path = require('path');
module.exports = {
  mode: 'development',
  /* webpack-dev-server를 콘솔이 아닌 자바스크립트로 실행 할 땐,
  HotReloadingModule 를 사용하기 위해선 dev-server 클라이언트와
  핫 모듈을 따로 entry 에 넣어주어야 합니다. */
  entry: [
    './src/index.js',
    './src/style.css',
    'webpack-dev-server/client?http://0.0.0.0:3001', // 개발서버의 포트가 이 부분에 입력되어야 제대로 작동합니다
    'webpack/hot/only-dev-server'
  ],
  output: {
    path: '/', // public 이 아니고 /, 이렇게 하면 파일을 메모리에 저장하고 사용합니다
    filename: 'bundle.js'
  },
  devServer: {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    historyApiFallback: true,
    contentBase: './public',
    /* 모든 요청을 프록시로 돌려서 express의 응답을 받아오며,
    bundle 파일의 경우엔 우선권을 가져서 devserver 의 스크립트를 사용하게 됩니다 */
    proxy: {
      "**": "http://localhost:3000" // express 서버주소
    },
    stats: {
      // 콘솔 로그를 최소화 합니다
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  // ES6 문법과 JSX 문법을 사용한다
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'react'],
        plugins: ["react-hot-loader/babel"]
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader',
      options: {
        name: '[hash].[ext]',
        limit: 10000,
      },
    }],
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  }
};