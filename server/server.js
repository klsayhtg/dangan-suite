import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import webpack from 'webpack';
import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY
import mongoose from 'mongoose';
import session from 'express-session';

const app = express();
const port = 3000;
const devPort = 3001;

app.use(morgan('dev'));
app.use(bodyParser.json());

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/dangan_suite_db');

/* use session */
app.use(session({
  secret: 'dansuite$76th$8a4738',
  resave: false,
  saveUninitialized: true
}));

app.use('/', express.static(path.join(__dirname, './../public')));

app.get('/hello', (req, res) => {
  return res.send('Hello CodeLab');
});

app.listen(port, () => {
  console.log('Express is listening on port', port);
});

if (process.env.NODE_ENV === 'development') {
  console.log('Server is running on development mode');
  const config = require('../webpack.dev.config');
  const compiler = webpack(config);
  const devServer = new WebpackDevServer(compiler, config.devServer);
  devServer.listen(
    devPort, () => {
      console.log('webpack-dev-server is listening on port', devPort);
    }
  );
}

/* setup routers & static directory */
import api from './routes';
app.use('/api', api);

/* support client-side routing */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal server error');
});


// import express from 'express';
// import WebpackDevServer from 'webpack-dev-server';
// import webpack from 'webpack';
// import path from 'path';
// import morgan from 'morgan'; // HTTP REQUEST LOGGER
// import bodyParser from 'body-parser'; // PARSE HTML BODY
// import session from 'express-session';
//
// const app = express();
// const port = 3000;
// const devPort = 3001;
//
//
// if (process.env.NODE_ENV === 'development') {
//   console.log('Server is running on development mode');
//   const config = require('../webpack.dev.config');
//   let compiler = webpack(config);
//   let devServer = new WebpackDevServer(compiler, config.devServer);
//   devServer.listen(devPort, () => {
//     console.log('webpack-dev-server is listening on port', devPort);
//   });
// }
//
// app.use(morgan('dev'));
// app.use(bodyParser.json());
//
// /* use session */
// app.use(session({
//   secret: 'CodeLab1$1$234',
//   resave: false,
//   saveUninitialized: true
// }));
//
// /* setup routers & static directory */
// import api from './routes';
// app.use('/api', api);
//
//
// // app.use('/', express.static(__dirname + '/../public'));
// //
// // app.get('/hello', (req, res) => {
// //   return res.send('Can you hear me?');
// // });
// //
// //
// // import posts from './routes/routes';
// // app.use('/posts', posts);
// //
// // const server = app.listen(port, () => {
// //   console.log('Express listening on port', port);
// // });