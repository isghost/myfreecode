// https://www.mediawiki.org/w/api.php/w/api.php?action=opensearch&format=json&search=cat
//https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpslimit=10&prop=pageimages%7Cpageterms|info&piprop=thumbnail&pithumbsize=50&pilimit=10&redirects=&wbptterms=description&inprop=url&format=json&gpssearch=Albert%20Ei

$(document).ready(function(){
	$(".searchInput input").keydown(function(event){
		if(event.keyCode == 13){
			var searchStr = $(this).val();
			if(searchStr.length == 0){
				return ;
			}
			var baseUrl = "https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpslimit=10&prop=pageimages%7Cpageterms|info&piprop=thumbnail&pithumbsize=50&pilimit=10&redirects=&wbptterms=description&inprop=url&format=json&gpssearch="
			var reqUrl = baseUrl + searchStr;
			$.ajax({
			   type: "GET",
			   url: reqUrl,
			   dataType: "jsonp",
			   jsonpCallback: 'callback',
			   success: function(msg){
			   	console.log(msg);
			     // alert( "Data Saved: " + msg );
			     showSearchResult(msg);
			   }
			});
		}
	});
	$(".searchInput i").click(function(){
		$(".searchInput input").val("");
	});
});

function showSearchResult(msg){
	$(".container").css("justify-content","flex-start");
	var pages = msg.query.pages;
	$(".item").each(function(index, val){
		var $val = $(val);
		if($val.css("display") != "none"){
			$val.remove();
		}
	});
	for(var i = 0 ; i < pages.length;i++){
		var newItem = $(".item:first").clone().css("display","block").appendTo(".container");
		newItem.find("a").attr("href",pages[i].fullurl);
		if (pages[i].terms){
			newItem.find("p").text(pages[i].terms.description[0]);
		}
		newItem.find("span").text(pages[i].title);
	}
}
