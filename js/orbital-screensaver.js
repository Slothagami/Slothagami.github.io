var canvas = document.getElementById("bg-canvas");
var c = canvas.getContext("2d");

const fps = 30;

var center = {x:canvas.width/2, y:canvas.height/2};
var mouse = {x:center.x,y:center.y};

const point = {
	count:      900,//40, 900
	color:      sg.choose("#21b9ff", "red", "green"),
	rad:        1.5,// 6, 1.5
	lerpsp:     0.2,// 0.2, 0.2
	minDist:    4,// 150, 4
	speed:      {min:Math.PI/200,max:Math.PI/100},
	ringChance: 0.3,
	target:     center // center or mouse
}

var points = [];

window.onload = function() {
	resize();
	
	// event listner to update mouse
	canvas.addEventListener("mousemove", function(e) {
		mouse.x = e.x;
		mouse.y = e.y;
	});
	window.addEventListener("resize", resize);
	
	init();
	setInterval(main, 1000/fps);
}

function init() {
	// make circles
	var ring = 0;
	for(var i = 0; i < point.count; i++) {
		var orbitDist = point.minDist + (point.rad * 2) * ring;
		var angle = Math.random() * Math.PI * 2;
		var speed = sg.randomRange(point.speed.min, point.speed.max);
		
		points.push(new Point(center.x, center.y, center.x, center.y, orbitDist, angle, speed));
		
		ring += Math.random() < point.ringChance;
	}
}
function main() {
	colorRect(0, 0, canvas.width, canvas.height, "rgba(0, 0, 0, 0.05)");
	for(var i = 0; i < points.length; i++) {
		points[i].update();
	}
}
function resize() {
	sg.resize(canvas);
	center.x = canvas.width/2;
	center.y = canvas.height/2;
}

// objects
function Point(x, y, tx, ty, orbitDist, angle, speed) {
	this.x = x;
	this.y = y;
	this.tx = tx;
	this.ty = ty;
	this.orbitDist = orbitDist;
	this.angle = angle;
	this.speed = speed;
	this.px = x;
	this.py = y;
	
	this.update = function() {
		// orbit around mouse at this.orbitDist
		this.tx = point.target.x + (Math.cos(this.angle) * this.orbitDist);
		this.ty = point.target.y + (Math.sin(this.angle) * this.orbitDist);
		
		// save previous pos
		this.px = this.x;
		this.py = this.y;
		
		// move
		this.x = sg.lerp(this.x, this.tx, point.lerpsp);
		this.y = sg.lerp(this.y, this.ty, point.lerpsp);
		
		// rotate
		this.angle += this.speed;
		this.draw();
	}
	this.draw = function() {
		// draw line to previous pos
		c.beginPath();
		c.lineWidth = point.rad * 2;
		c.strokeStyle = point.color;
		c.moveTo(this.px, this.py);
		c.lineTo(this.x, this.y);
		c.stroke();
		
		colorCircle(this.x, this.y, point.rad, point.color);
	}
}

// draw
function colorCircle(x, y, rad, color) {
	c.beginPath();
	c.fillStyle = color;
	c.arc(x, y, rad, 0, Math.PI*2, false);
	c.fill();
}
function colorRect(x, y, width, height, color) {
	c.fillStyle = color;
	c.fillRect(x, y, width, height);
}