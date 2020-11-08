/*
	Todo:
	have thin rectangles move up to meet mouse from left side, like the audio thing
	or the orbital thing, radius based off mouse?
	push commits
*/

// responsiveness stuff
$(document).ready(function() {
	if(sg.onMobile()) {
		$("h1").css({
			"font-size":"50px"
		});
	}
});

// Canvas stuff
var canvas = document.getElementById("doc-canvas-title");
var c = canvas.getContext("2d");

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

window.onload = function() {
	resize();
	window.addEventListener("resize", resize);
	setInterval(main, 1000/fps);
}

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
		c.clearRect(0, 0, canvas.width, canvas.height);		
		text(padding, titleHeight, displayMessage, canvas.width/10, "white");
	}else{
		displayMessage = desc.substring(0, letters);
		letters++;
		
		if(letters < desc.length + 1) displayMessage += "|";
		
		// draw
		c.clearRect(0, 0, canvas.width, canvas.height);
		text(padding, titleHeight, message, canvas.width/10, "white");
		text(padding, descHeight, displayMessage, canvas.width/20, "#505050");
	}
}
function resize() {
	canvas.style.position = "static";
	canvas.width = window.innerWidth - 12;
	canvas.height = sg.onMobile()? 650: 300;
	
	titleHeight = canvas.height*0.3;
	descHeight  = canvas.height*0.7;
}
function text(x, y, string, fontSize, color) {
	c.fillStyle = color;
	c.font = fontSize + "px Arial";
	c.textBaseline = "middle";
	c.fillText(string, x, y);
}