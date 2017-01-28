$(document).ready(function(){
	setCircle(0.6);
	let percent = 0;
	setInterval(function(){
		percent = percent + 0.01;
		if(percent > 1){
			percent = 0;
		}
		//setCircle(percent);
	}, 30);
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
	console.log(pathStr); 
	$("#bgCircle").attr("d",pathStr);
}