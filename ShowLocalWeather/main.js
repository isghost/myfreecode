
function setQuote(){

	$.ajax({
		type: "GET",
		crossDomain: true,
		dataType: 'jsonp',
		// url: "http://127.0.0.1:3000/api/randomQuotes",
		url: "http://www.ccyblog.com:3000/api/randomQuotes",
		jsonpCallback: 'callback',
		success: function(msg){

		},
		error: function(msg){
			console.log("服务器挂掉了");
		}
	});
}


$(document).ready(function(){
	$(".newQuote").click(setQuote);
	
	setQuote();
});