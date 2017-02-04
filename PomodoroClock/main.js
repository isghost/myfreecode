// svg  知识 https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
let curStatus = 2; // 1 break 2 session
let countDown = 25 * 60;
let curCountDownTotal = 25 * 60;
let isPlaying = false;
$(document).ready(function(){
	addAdjustCb();
	setCircle(0.0);
	startCountDown();
});

function setCircle(percent){
	var x = 162.5;
	var y = 162.5;
	var radius = 100;
	var deltaX = Math.sin(percent * Math.PI) * radius;
	var deltaY = Math.cos(percent * Math.PI) * radius;
	var beginX = x - deltaX;
	var beginY = y + deltaY;
	var endX = x + deltaX;
	var endY = y + deltaY;
	var arcFlag = 0;
	if(percent * 180 > 90){
		arcFlag = 1;
	}
	var pathStr = "M" + beginX + " " + beginY + " A " + radius + " " + radius + ", 0 ," + arcFlag + ", " +
		" 0, " + endX + ", " + endY + " Z";
	// console.log(pathStr); 
	$("#bgCircle").attr("d",pathStr);
}

function addAdjustCb(){
	let adjustType = [1, 1, 2, 2]; // 1 break 2 session
	let value = [-1, 1, -1, 1]; // minus 1 or add 1
	let select = [".break .minus", ".break .add", ".session .minus", ".session .add"];
	for(let i = 0;i < select.length; i++){
		$(select[i]).click(function(){
			if(isPlaying){
				return ;
			}
			adjustTime(adjustType[i], value[i]);
		});
	}

	$(".showTime").click(function(){
		isPlaying = !isPlaying;
	});
}
function adjustTime(adjustType, value){
	let select = [".break .breakTime", ".session .breakTime"];
	let breakTimeEle = $(select[adjustType -1 ]);
	let countDownTotal = parseInt(breakTimeEle.text());
	countDownTotal += value;
	if(countDownTotal < 0){
		return ;
	}
	breakTimeEle.text(countDownTotal);
	if(adjustType == curStatus){
		countDown = countDownTotal * 60;
		$(".remainTime").text(formatTime(countDown));
		curCountDownTotal = countDown;
	}
}

function formatTime(time){
	let min = Math.floor(time / 60);
	let sec = time % 60;
	if(sec < 10){
		sec = "0" + sec;
	}
	return min + ":" + sec;
}

function startCountDown(){
	setInterval(function(){
		if(!isPlaying){
			return ;
		}
		countDown = countDown - 1;
		if(countDown < 0){
			curStatus = !(curStatus - 1) + 1;
			reset();
			return ;
		}
		percent = (curCountDownTotal - countDown) / curCountDownTotal;
		if(percent > 1){
			percent = 0;
		}
		setCircle(percent);
		$(".remainTime").text(formatTime(countDown));
	}, 1000);
}

function reset(){
	if(curStatus == 1){
		$("#bgCircle").attr("fill", "orange");
		$(".status").text("break");
		countDown = parseInt($(".break .breakTime").text()) * 60;
		curCountDownTotal = countDown;
	}
	else if(curStatus == 2){
		$("#bgCircle").attr("fill", "blue");
		$(".status").text("session");
		countDown = parseInt($(".session .breakTime").text()) * 60;
		curCountDownTotal = countDown;
	}
	setCircle(0.0);
}