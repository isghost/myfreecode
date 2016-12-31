// 提交github时，需要修改apikey，防止泄漏
var apiKey = "glqosdulzch3edqw";
// var apiKey = "secret";
var crypto = require('crypto');
var querystring = require("querystring");
var superagent = require("superagent");
var express = require('express');


var router = express.Router();

//  下面是显示的当天

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', new Date().toLocaleString());
  next();
});
router.get('/', function(req, res) {
	var longi = req.query.longi;
	var lati = req.query.lati;
	var ts = Date.now();
	var uid = "U4CA9F19FE";
	var preStr = "ts=" + ts + "&uid=" + uid;
	var cipher = crypto.createHmac("sha1", apiKey);
	cipher.update(preStr);
	var signBase64 = cipher.digest().toString("base64");
	console.log(signBase64);
	var signUrlEncode = querystring.escape(signBase64);
	superagent.get("https://api.thinkpage.cn/v3/weather/now.json")
		.query("location=" + longi + ":" + lati)
		.query(preStr)
		.query("sig=" + signUrlEncode)
		.end(function(err, weatherRes){
			res.send("callback(" +JSON.stringify(weatherRes.body.results[0]) + ")");
		});
});

module.exports = router;