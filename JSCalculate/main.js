
let lastValue = 0;
let hasDot = false;
let lastOperator = null;
let needClear = false;
$(document).ready(function(){
	$("#ac").click(ACcb);
	$("#ce").click(CEcb);
	let op = ["+", "-", "*", "/", "%","="];
	let opId = ["plus", "minus", "multi", "divide", "mod", "equal"];
	for(let i = 0; i < opId.length;i++){
		$("#" + opId[i]).click(function(){
			operatorCb(op[i]);
		});
	}

	let num = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
	let numId = ["zero", "one","two", "three","four","five", "six","seven","eight","nine", "dot"];
	for(let i = 0;i < numId.length;i++){
		$("#" + numId[i]).click(function(){
			clickNumCb(num[i]);
		});
	}
});

function ACcb(){
	lastValue = 0;
	hasDot = false;
	lastOperator = null;
	$(".showText").text("0");
}

function CEcb(){
	$(".showText").text("0");
}
// index 10 为 .
function clickNumCb(index){
	if(needClear){
		if(index == 10){
			return ;
		}
		$(".showText").text("0");
	}
	needClear = false;
	if(index === 10){
		if(hasDot){
			return;
		}
		else{
			hasDot = true;
			index = ".";
		}
	}
	let curValue = $(".showText").text();
	if(curValue.length >= 10){ //最大长度设置为10
		return ;
	}
	if(curValue.length == 1 && curValue[0] == "0" && index != "."){
		$(".showText").text(index);
	}
	else{
		$(".showText").text(curValue + index);
	}
}

function calc(a,b,op){
	if(op == "*"){
		return a * b;
	}
	else if(op == "+"){
		return a + b;
	}
	else if(op == "-"){
		return a - b;
	}
	else if(op == "/"){
		return a / b;
	}
	else if(op == "%"){
		return a % b;
	}
	return b;
}
function operatorCb(op){
	if(needClear && lastOperator != "="){
		lastOperator = op;
		return ;
	}

	if(lastOperator){
		let curValue = $(".showText").text();
		curValue = parseFloat(curValue);
		if(curValue === 0 && (op == "/" || op == "%")){
			return ;
		}
		lastValue = calc(lastValue, curValue, lastOperator);
		lastValue = Math.floor(lastValue * 10000 + 0.5) / 10000;

	}
	else{
		lastValue = parseFloat($(".showText").text());
	}
	if(op == "="){
		lastOperator = null;
	}
	else{
		lastOperator = op;
	}
	$(".showText").text(lastValue);
	needClear = true;
}