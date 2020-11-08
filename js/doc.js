/*
	Todo:
	have thin rectangles move up to meet mouse from left side, like the audio thing
	or the orbital thing, radius based off mouse?
	push commits

	// make bubbles reset on resize
*/

// Background Canvas Stuff
var canvas = document.getElementById("background-canvas");
var c = canvas.getContext("2d");

const BGfps = 30;
const cellS = 10;

var mouse = {x:0, y:0};
var bubble = {
	rad: {min:30,max:60},
	color: ["#151515", "#101010"],
	number: 60,
	speed: {min:0.02, max:0.1},
	grow: {ammount:1.2, speed:0.2}
}
var bubbles = [];

window.onload = function() {
	// Title Stuff
	resize();
	window.addEventListener("resize", resize);
	setInterval(main, 1000/fps);
	
	// make bubbles
	for(var i = 0; i < bubble.number; i++) {
		var hs, vs, an, ra, sp;
		an = Math.random() * Math.PI*2;
		hs = Math.sin(an);
		vs = Math.cos(an);
		ra = sg.randomRange(bubble.rad.min, bubble.rad.max);
		sp = sg.randomRange(bubble.speed.min, bubble.speed.max);
		
		
		bubbles.push(new Bubble(
			sg.randomRange(ra, canvas.width-ra), 
			sg.randomRange(ra, canvas.height-ra),
			ra,
			hs * sp, vs * sp,
			bubble.color[Math.floor(Math.random() * bubble.color.length)]
		));
	}
	
	// Background Stuff
	window.addEventListener("mousemove", function(e) {
		mouse.x = e.x;
		mouse.y = e.y;
	});
	setInterval(bg, 1000/BGfps);
}
function bg() {
	c.clearRect(0, 0, canvas.width, canvas.height);
	
	for(var i = 0; i < bubbles.length; i++) {
		bubbles[i].update();
	}
	//colorCircle(mouse.x, mouse.y, 10, "red")
}

function colorRect(x, y, width, height, color) {
	c.fillStyle = color;
	c.fillRect(x, y, width, height);
}
function colorCircle(x, y, rad, color) {
	c.beginPath();
	//c.strokeStyle = color;
	c.fillStyle = color;
	c.arc(x, y, rad, 0, Math.PI*2, false);
	//c.stroke();
	c.fill();
}

// Objects
function Bubble(x, y, rad, hs, vs, color) {
	this.x = x;
	this.y = y;
	this.rad = rad;
	this.dRad = rad;
	this.hs = hs;
	this.vs = vs;
	this.color = color;
	
	this.update = function() {
		this.x += this.hs;
		this.y += this.vs;
		
		if(this.x + this.rad >= canvas.width || this.x - this.rad <= 0) this.hs *= -1;
		if(this.y + this.rad >= canvas.height || this.y - this.rad <= 0) this.vs *= -1;
		
		if(sg.angDist(mouse.x, mouse.y, this.x, this.y) <= this.rad) {
			this.rad = sg.lerp(this.rad, this.dRad * bubble.grow.ammount, bubble.grow.speed);
		} else this.rad = sg.lerp(this.rad, this.dRad, bubble.grow.speed);
		
		this.draw();
	}
	this.draw = function() {
		colorCircle(this.x, this.y, this.rad, this.color);
	}
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