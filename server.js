const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());
require('./api/models/index');
require('./api/routes/index')(app);

let listenHTTP = () => {
  app.listen(port);
  console.log('Listening on port', port);
};

let runServer = () => {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', runServer)
    .once('open', listenHTTP);
  return mongoose.connect(process.env.MONGODB_URL, {
    keepAlive: 1,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

runServer();
