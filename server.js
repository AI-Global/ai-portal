const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 5000;
const secret = process.env.SECRET || 'secret.';
const app = express();

app.use(
  require('express-jwt')({
    secret: secret,
    algorithms: ['HS256'],
    credentialsRequired: false,
    getToken: (req) => {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  })
);

app.use((req, res, next) => {
  req.jwtSign = (obj) => {
    return jwt.sign(obj, secret, {
      algorithm: 'HS256',
    });
  };
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
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
