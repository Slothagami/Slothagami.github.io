/* Does the typing thing for the title Canvas */
var canvas=document.getElementById("doc-canvas-title"),
	c=canvas.getContext("2d"),
	message="sg.js",
	desc="My first JavaScript Libary.",
	fps=15,
	padding=100,
	letters=0,
	displayMessage="",
	pausedForDot=!1,
	pausedForEnd=0,
	endPauseLength=5,
	title=!1,
	titleHeight=.3*canvas.height,
	descHeight=.7*canvas.height;

function main(){
	title?(displayMessage=desc.substring(0,letters),
		++letters<desc.length+1&&(displayMessage+="|"),
		c.clearRect(0,0,canvas.width,canvas.height),
		text(padding,titleHeight,message,canvas.width/10,"white"),
		text(padding,descHeight,displayMessage,canvas.width/20,"#505050")):(displayMessage=message.substring(0,letters),
		letters<message.length+1?displayMessage+="|":endPauseLength<pausedForEnd?(title=!0,letters=0):pausedForEnd++,
		2!=letters||pausedForDot?letters++:pausedForDot=!0,
	
		c.clearRect(0,0,canvas.width,canvas.height),
		text(padding,titleHeight,displayMessage,canvas.width/10,"white"))
}

function resize(){
	canvas.style.position="static",
	canvas.width=window.innerWidth-12,
	canvas.height=sg.onMobile()?650:300,
	titleHeight=.3*canvas.height,
	descHeight=.7*canvas.height,
	bubbleResize()
}

function text(e,t,s,a,i){
	c.fillStyle=i,
	c.font=a+"px Arial",
	c.textBaseline="middle",
	c.fillText(s,e,t)
}

window.onload=function(){
	resize(),
	window.addEventListener("resize",resize),
	setInterval(main,1e3/fps),
	bubbleSetup(),
	window.addEventListener("mousemove",bubbleMouseMove);
};