//https://api.twitch.tv/kraken/channels/bobross?client_id=fjzhteomj28jkr8sghbnl9d8jjv5wd
//https://api.twitch.tv/kraken/streams/bobross?client_id=fjzhteomj28jkr8sghbnl9d8jjv5wd
var channels = ["bobross","freecodecamp", "kaypikefashion","c9sneaky","yasuotochallenger","tsm_dyrus","standy5229","meteos","failverde"];
// var channels = ["bobross"];
var magicPreifx = "nmjuy-";
var curShowStatus = 1;
function setChannelInfo(){
	for(var i = 0; i < channels.length; i++){
		var url = "https://api.twitch.tv/kraken/channels/" + channels[i] + "?client_id=fjzhteomj28jkr8sghbnl9d8jjv5wd";
		$.ajax({
			type: "GET",
			crossDomain: true,
			dataType: 'jsonp',
			url: url,
			jsonpCallback: 'callback' + channels[i],
			success: function(msg){
				var newItem = $(".item:first").clone().css("display","block").appendTo(".listview");
				newItem.find("img").attr("src", msg.logo);
				newItem.find("a").text(msg.display_name).attr("href",msg.url);
				newItem.find(".status").text(msg.status);
				newItem.addClass(magicPreifx + msg.name);
				setOnlineStatus(msg.name);
			},
			error: function(msg){
				console.log("服务器挂掉了");
			}
		});
	}
}

function setOnlineStatus(name){
	var url = "https://api.twitch.tv/kraken/streams/" + name + "?client_id=fjzhteomj28jkr8sghbnl9d8jjv5wd";
	$.ajax({
		type: "GET",
		crossDomain: true,
		dataType: 'jsonp',
		url: url,
		jsonpCallback: 'callback' + name,
		success: function(msg){
			if(msg.stream){
				$("." + magicPreifx + name + " > i").attr("class","fa fa-caret-square-o-right fa-2x").css("color","green");
			}
		},
		error: function(msg){
			console.log("服务器挂掉了");
		}
	});
}

// @params status 需显示的状态，1表示任意，2在线，3离线
function isStatifyStatus(item, status){
	if(status == 1){
		return true;
	}
	else if(item.find(".fa-caret-square-o-right").length >= 1 && status === 2){
		return true;
	}
	else if(item.find(".fa-caret-square-o-right").length == 0 && status === 3){
		return true;
	}
	return false;
}

// @params name 搜索的名字
function isStatifyName(item, name){
	if(!name || name.length == 0){
		return true;
	}
	var showName = item.find(".showName").text();
	name = name.toLowerCase();
	showName = showName.toLowerCase();
	if(showName.match(name)){
		return true;
	}
	else{
		return false;
	}
}

function setShowItem(status){
	var searchName = $(".searchName").val();
	curShowStatus = status || curShowStatus;
	$(".item:gt(0)").each(function(index){
		if(isStatifyStatus($(this), curShowStatus) && isStatifyName($(this), searchName)){
			$(this).css("display", "block");
		}
		else{
			$(this).css("display", "none");
		}
	});
}

function setMenuListener(){
	$(".allchannel").click(function(){
		setShowItem(1);
	});
	$(".online").click(function(){
		setShowItem(2);
	});
	$(".offline").click(function(){
		setShowItem(3);
	});
}

function setSearch(){
	$(".form-control").keyup(function(){
		setShowItem();
	});
}


$(document).ready(function(){
	setChannelInfo();
	setMenuListener();
	setSearch();
});