/*
	Todo:
	have thin rectangles move up to meet mouse from left side, like the audio thing
	or the orbital thing, radius based off mouse?
	push commits
*/

// Background Canvas Stuff
var canvas = document.getElementById("background-canvas");
var c = canvas.getContext("2d");

const BGfps = 30;
const cellS = 80;

var mouse = {x:0, y:0};
var cp = {x:0, y:0};

window.onload = function() {
	// Title Stuff
	resize();
	window.addEventListener("resize", resize);
	setInterval(main, 1000/fps);
	
	// Background Stuff
	window.addEventListener("mousemove", function(e) {
		mouse.x = e.x;
		mouse.y = e.y;
		
		cp.x = Math.floor(mouse.x / cellS) * cellS;
		cp.y = Math.floor(mouse.y / cellS) * cellS;
	});
	setInterval(bg, 1000/BGfps);
}
function bg() {
	colorRect(cp.x, cp.y, cellS, cellS, "red");
	
	c.strokeStyle = "black";
	c.lineWidth = "10px";
	c.strokeRect(cp.x, cp.y, cellS, cellS);
	
	colorRect(0, 0, canvas.width, canvas.height, "rgba(0, 0, 0, 0.1)");
	
}

function colorRect(x, y, width, height, color) {
	c.fillStyle = color;
	c.fillRect(x, y, width, height);
}

// Title Canvas stuff
var tcanvas = document.getElementById("doc-canvas-title");
var tc = tcanvas.getContext("2d");

const message = "sg.js";
const desc = "My first JavaScript Libary.";
const fps = 15;
const padding = 100;
var letters = 0;
var displayMessage = "";
var pausedForDot = false;
var pausedForEnd = 0;
var endPauseLength = 5;
var title = false;

var titleHeight = canvas.height*0.3;
var descHeight  = canvas.height*0.7;

function main() {
	if(!title) {
		displayMessage = message.substring(0, letters);
		if(letters < message.length + 1) displayMessage += "|"; else {
			if(pausedForEnd > endPauseLength){
				title = true;
				letters = 0;
			}else pausedForEnd++;
		}
		
		if(letters != 2) letters++; else{
			if(!pausedForDot)pausedForDot = true; else letters++;
		}
		
		// draw
		tc.clearRect(0, 0, tcanvas.width, tcanvas.height);		
		text(padding, titleHeight, displayMessage, tcanvas.width/10, "white");
	}else{
		displayMessage = desc.substring(0, letters);
		letters++;
		
		if(letters < desc.length + 1) displayMessage += "|";
		
		// draw
		tc.clearRect(0, 0, tcanvas.width, tcanvas.height);
		text(padding, titleHeight, message, tcanvas.width/10, "white");
		text(padding, descHeight, displayMessage, tcanvas.width/20, "#505050");
	}
}
function resize() {
	sg.resize(canvas);
	canvas.style.position = "fixed";
	
	// Title
	tcanvas.style.position = "static";
	tcanvas.width = window.innerWidth - 12;
	tcanvas.height = sg.onMobile()? 650: 300;
	
	titleHeight = tcanvas.height*0.3;
	descHeight  = tcanvas.height*0.7;
}
function text(x, y, string, fontSize, color) {
	tc.fillStyle = color;
	tc.font = fontSize + "px Arial";
	tc.textBaseline = "middle";
	tc.fillText(string, x, y);
}