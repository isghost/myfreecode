$(document).ready(function(){
	$(".portfolio .item").map(function(count){
		$(this).css("background-image", "url(images/cover"+(count + 1)+ ".jpg)");
	});
});