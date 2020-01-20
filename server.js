/**
 * Module dependencies.
 */
require('newrelic');


var express = require('express'),
    Cors = require('cors'),
    bodyParser = require('body-parser'),
    logger = require('morgan');

var prometheus = require('./prometheus');

const app = express();
const API_PORT = process.env.API_PORT || 8080;

app.use(Cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(prometheus.requestCounters);
app.use(prometheus.responseCounters);
prometheus.injectMetricsRoute(app);
prometheus.startCollection();

require('./routes/index')(app);
require('./routes/registerUser')(app);
require('./routes/testReq')(app);

app.listen(API_PORT, () => {
    console.log("here started");
});

module.exports = app;
