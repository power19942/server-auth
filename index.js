const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const mongoose = require("mongoose");
//DB setup
mongoose.connect('mongodb://localhost:27017/auth');
//app setup
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
router(app);
//server setup
const port = process.env.PORT || 3000 ;
const server = http.createServer(app);
server.listen(port);