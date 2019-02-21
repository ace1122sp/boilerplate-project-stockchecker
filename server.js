'use strict';
require('dotenv').config();

const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

const errorHandler = config.app.env === 'PRODUCTION' ? require('./libs/prodErrorHandler') : require('./libs/devErrorHandler');
 
const app = express();

// connect to db this need to be edited and cleaned up
mongoose.Promise = global.Promise;
mongoose.connect(config.db.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to db');
  })
  .catch(() => {
    console.error(err.message);
    process.exit(1);
  });

app.use(cors({ origin: '*' })); //For FCC testing purposes only
app.use(helmet());
app.use((req, res, next) => {
  res.set({
    'Content-Security-Policy': "default-src 'self' 'unsafe-eval' 'unsafe-inline'; img-src 'self' *.unsplash.com/uJhgEXPqSPk; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; object-src 'none'"
  });

  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// serve gziped static files
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.use(express.static(process.cwd() + '/public'));

// test route
app.get('/testside', (req, res) => {
  res.sendFile(process.cwd() + '/views/testside.html');
});

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  

// Error handling 
app.use(errorHandler.logErrors);
app.use(errorHandler.handleClientResponse);

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(config.app.port || 3000, function () {
  console.log("Listening on port " + config.app.port);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        const error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 3500);
  }
});

// for testing purposes
module.exports = app;