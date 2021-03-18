/*
	To Use
	Add bgInit() to window.onload, and
	Include a canvas with the id 'bgcanvas'
*/

var canvas, c, 
	bgcolor   = 'rgba(16,16,16,0.1)', // same as #101010 but alpha of < 1
	fillcolor = '#090909',
	mouse = {x:0,y:0,px:0,py:0};

// Main
function bgInit() { // run on window.onload //
	canvas = document.getElementById("bgcanvas");
	c = canvas.getContext("2d");
	
	// Style the canvas
	canvas.style.position = 'absolute'
	canvas.style.zIndex = '-1'
	canvas.style.transform = 'translate(0, -16px)'
	
	// find out when the window is resized
	resize();
	window.addEventListener("resize", resize);
	window.addEventListener("mousemove", function(e){
		mouse.x = e.x; mouse.y = e.y;
	});
	
	setInterval(main, 1000/30) // 30fps
}
function main() {
	c.fillStyle = bgcolor
	c.fillRect(0,0,canvas.width,canvas.height);
	
	var radius = 150
	// draw a circle around the mouse
	c.beginPath();
	c.fillStyle = fillcolor
	c.arc(
		mouse.x, mouse.y,
		radius, 0, Math.PI*2,
		false
	)
	c.fill();
	
	// draw line to previous mouse pos
	c.beginPath();
	c.strokeStyle = fillcolor
	c.lineWidth = radius*2
	
	c.moveTo(mouse.x, mouse.y);
	c.lineTo(mouse.px, mouse.py);
	
	c.stroke();
	
	mouse.px = mouse.x; mouse.py = mouse.y;
	// ^ done here to keep it in sync with the mousemove event
}

// General
function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.position = "fixed";
}