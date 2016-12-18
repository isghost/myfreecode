$(document).ready(function(){
	$(".portfolio .item").map(function(count){
		$(this).css("background-image", "url(https://github.com/isghost/myfreecode/raw/master/PersonalPortfolio/images/cover"+(count + 1)+ ".jpg)");
	});


});