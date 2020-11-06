/*
	Todo:
	scripts.js make this efault, display:none on mobile and display:block on image
	get mouse pos relative to canvas
*/
var canvas;
var c;
const fps = 60;
const lineW = 3;
const lineC = "white";
const bgColor = "#181818";
const maxSegments = 5;

var segmentCount = 3;

var mouse = {
	x:0,
	y:0
}

// arm
var segments = [];

window.onload = function() {
	canvas = document.getElementById("wik-canvas");
	c = canvas.getContext("2d");
	
	resize();
	window.addEventListener("resize", resize);
	canvas.addEventListener("mousemove", function(e) {
		// Get mouse pos reletive to canvas:
		var rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
		
		// update arm
		segments[segments.length-1].moveBack();
		for(var i = 0; i < segments.length; i++) {
			segments[i].update();
		}
	});
	
	setupSegments();
	setInterval(step, 1000/fps);
}

// objects
function Segment(x, y, angle, length, targ) {
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.length = length;
	this.targ = targ;
	
	this.update = function() {
		// update angle
		this.angle = an(this.x, this.y, this.targ.x, this.targ.y);
		// move so other side is target pos
		this.x = this.targ.x - (Math.cos(this.angle) * this.length);
		this.y = this.targ.y - (Math.sin(this.angle) * this.length);
	}
	this.draw = function() {
		// draw line from x, y, to the length + angle
		var x2 = this.x + (Math.cos(this.angle) * this.length);
		var y2 = this.y + (Math.sin(this.angle) * this.length);
		
		c.beginPath();
		c.strokeStyle = lineC;
		c.lineWidth = lineW;
		
		c.moveTo(this.x, this.y);
		c.lineTo(x2, y2);
		
		c.stroke();
	}
	this.moveBack = function() {
		// move all the segments back
		var movex = this.x -  canvas.width/2;
		var movey = this.y - canvas.height/2;
		
		for(var i = 0; i < segments.length; i++) {
			segments[i].x -= movex;
			segments[i].y -= movey;
		}
	}
}

// general functions
function step() {
	segments[segments.length-1].moveBack();
	
	draw();
}
function draw() {
	c.clearRect(0, 0, canvas.width, canvas.height);
	
	colorCircle(canvas.width/2, canvas.height/2, canvas.width/2, bgColor);
	
	for(var i = 0; i < segments.length; i++) {
		segments[i].draw();
	}
}
function resize() {
	canvas.width = canvas.height =  window.innerWidth * 0.4;
	
	// randomize segment number
	var minSegments = 2;
	segmentCount = randomRange(minSegments, maxSegments);
	
	// remake arm
	segments = [];
	setupSegments();
}
function setupSegments() {
	// loop to make [segmentCount] segments at [canvas.width/2] as max length
	segments.push(new Segment(0, 0, Math.PI/2, canvas.width/(2 * segmentCount), mouse));
	
	for(var i = 1; i < segmentCount; i++) {
		segments.push(new Segment(0, 0, Math.PI/2, canvas.width/(2 * segmentCount), segments[i-1]));
	}
}

// logic
function an(x1, y1, x2, y2) {
	var angle = 0;
	// law of cos & pythagoras
	var a = Math.abs(x1-x2);
	var b = Math.abs(y1-y2);
	var c = Math.hypot(a, b); // hypotenuse, sqrt(a^2 + b^2)
	
	// move it so x1 == y1 == 0
	var yy = x2-x1;
	var xx = y2-y1;
	var angle = Math.atan2(xx, yy); // angle from [0, 0] to the coords [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2]
	
	return angle;
}
function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}

// draw functions
function colorCircle(x, y, rad, color) {
	c.beginPath();
	c.fillStyle = color;
	c.arc(x, y, rad, 0, Math.PI*2, false);
	c.fill();
}