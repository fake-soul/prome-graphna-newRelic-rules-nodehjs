var express = require('express');
var router = express.Router();
var redis = require('../redis');


module.exports = (app) => {
  app.get('/setRedis', (req, res) => {
    redis('one', 'value');
    res.send("OK");
  });

};