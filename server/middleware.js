// server/app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const path = require('path');

const app = express();


const tumblr =require('tumblr.js')

app.use(cors())
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));


// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

var apiRouter = new express.Router();
app.use('/api', apiRouter);
require('./apiRoutes')(apiRouter);

app.get('*', (req, res) => {
  console.log('req.path', req.path)
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;