
function iteratorMapByKeyValue(map,callback){
	var keyArray = [];
	for(var k in map){
		keyArray.push(k);
	}
	keyArray.sort();
	for(var i = 0;i < keyArray.length; i++){
		callback(keyArray[i], map[keyArray[i]]);
	}
};


var config = {
  syncURL: "https://damu.wilddogio.com" //输入节点 URL
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();

// 上一个发消息的key
var lastMsgKey = null;

function showDanmu(msg){
	$(".damu").append("<p>" + msg + "</p>");
	var screenWidth = parseInt($(".damu").css("width"));
	var screenHeight = parseInt($(".damu").css("height"));
	var newDanmu = $(".damu p:last");
	var width = parseInt(newDanmu.css("width"));
	var height = parseInt(newDanmu.css("height"));
	console.log("width = ", newDanmu.css("width"), newDanmu.css("height"), width / 2 + "px")
	var randomHeight = Math.random() * (screenHeight - height);
	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255); 
	newDanmu.css("color","rgb("+r+"," + g + "," + b + ")");
	newDanmu.css("margin-left", "" + (screenWidth - width) + "px");
	newDanmu.css("margin-top", "" + randomHeight + "px");
	newDanmu.animate({
		"margin-left": 0 + "px",
	},5000,"linear",function(){
		newDanmu.remove();
	});
}

function clearDanmu(){
	$(".damu").children().remove();
}
ref.on("value", function(snapshot) {
    // console.log(snapshot.val().message);
    var message = snapshot.val().message;
    iteratorMapByKeyValue(message, function(key, val){
    	if(!lastMsgKey || lastMsgKey < key){
	    	console.log(val);
	    	showDanmu(val);
	    	lastMsgKey = key;
    	}
    });
    if(!message || Object.keys(message).length == 0){
    	clearDanmu();
    }
});

// ref.set({
//   "messageboard":{
//     "message1":{
//         "content" : "Wilddog, Cool!",
//         "presenter" : "Jack"
//     }
//   }
// });



$(document).ready(function(){
	$("#sendMsg").click(function(){
		var sendText = $("#inputTxt").val();
		ref.child("message").push(sendText)
		.then(function(newRef){
		       // newRef 的地址类似下面：
		       // https://<appId>.wilddogio.com/city/-JmRhjbYk73IFRZ7
		       // console.info(newRef.toString());
		   })
		.catch(function(err){
			console.info('remove node failed', err.code, err);  
		});

	});

	$("#clearDanmu").click(function(){
		console.log("11111111111");
		ref.child("message").remove()
		.then(function(newRef){
		       // newRef 的地址类似下面：
		       // https://<appId>.wilddogio.com/city/-JmRhjbYk73IFRZ7
		       clearDanmu();
		   })
		.catch(function(err){
			console.info('remove node failed', err.code, err);  
		});
	});
});
