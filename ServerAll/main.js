var express = require('express');
var app = express();
var quotesRouter = require("./randomQuotesRouter.js");
var localWeather = require('./localWeatherSign.js');

app.use('/api/randomQuotes', quotesRouter);

app.use('/api/localWeather', localWeather);

app.get('/', function (req, res) {
  res.send('这里暂未使用，联系方式810278677@qq.com');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});