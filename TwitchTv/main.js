//https://api.twitch.tv/kraken/channels/bobross?client_id=fjzhteomj28jkr8sghbnl9d8jjv5wd
//https://api.twitch.tv/kraken/streams/bobross?client_id=fjzhteomj28jkr8sghbnl9d8jjv5wd
function setTemp(){

	$.ajax({
		type: "GET",
		crossDomain: true,
		dataType: 'jsonp',
		// data:{longi : pos.coords.latitude, lati : pos.coords.longitude},
		url: "http://127.0.0.1:3000/api/localWeather",
		// url: "http://www.ccyblog.com:3000/api/localWeather",
		jsonpCallback: 'callback',
		success: function(msg){
			// var path = msg.location.path;
			// path = path.match(/([^,]+,)?[^,]+$/g);
			$(".location").text(msg.location.name);
			$(".weatherDesc").text(msg.now.text);
			$(".temp").text(msg.now.temperature + "℃");
			$(".weather > img").attr("src","./images/" + msg.now.code + ".png");
		},
		error: function(msg){
			console.log("服务器挂掉了");
		}
	});

}


$(document).ready(function(){
	
	setTemp();
});