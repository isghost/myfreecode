
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
function setQuote(){

	$.ajax({
		type: "GET",
		crossDomain: true,
		dataType: 'jsonp',
		// url: "http://127.0.0.1:3000/api/randomQuotes",
		url: "http://www.ccyblog.com:3000/api/randomQuotes",
		jsonpCallback: 'callback',
		success: function(msg){
			setShareUrl(msg.quote + $(".author").text());
			var randomIdx = Math.floor(Math.random() * colors.length);
			$("body").animate({
				backgroundColor: colors[randomIdx],
				color: colors[randomIdx]
	      	}, 2000);
	      	$(".quote").animate({
	      		opacity: 0
	      	},1000, function(){
	      		$(this).text(msg.quote);
	      		$(this).animate({
	      			opacity: 1
	      		},1000);
	      	});

	      	$(".myBtn").animate({
				backgroundColor: colors[randomIdx]
	      	}, 2000);

		},
		error: function(msg){
			$(".quote").text("服务器挂掉了，联系作者重启");
			console.log("服务器挂掉了");
		}
	});
}

function setShareUrl(msg){
	var baseUrl = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="
	$("#twitter").attr("href", baseUrl + msg);
}

$(document).ready(function(){
	$(".newQuote").click(setQuote);
	
	setQuote();
});