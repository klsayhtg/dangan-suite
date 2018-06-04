var path = require('path');
module.exports = {
  mode: 'production',
  entry: [
    './src/index.js',
    './src/style.css'
  ],
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },
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