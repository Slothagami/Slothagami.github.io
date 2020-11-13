var g = {canvas:0, c:0,title:"Games"},
	p = {canvas:0, c:0,title:"Projects",
		codeLines:[],indentSize:50,lineHeight:20,cindent:0,maxCindent:7,
		col:{bg:"#303030",text:"#404040",comment:"#005500",commentChance:0.15,breakChance:0.2,previous:0}
	},
	textMoveSp = 0.3,
	mouse = {x:0, y:0},
	hover = "",
	clearbox = {width:0, height:0},
	canvasesHover = false,
	format = {slant:0,padding:0,slantW:0,fps:30,messageSp:3},
	font = {size:70,font:"Sans-serif",color:"white"};
	
/* 
	Todo:	
		Make title in center/side (top/bottom based on side):
			grows/moves right on canvas hover
	
		Make mobile version pretty too:
			Make window roughly phone screen ratio.
			Test everything to make it stay pretty.
	
		Prefill With lines
			Make sure there are always lines on the whole screen.
	
		make bg darker on the hover one 
			(draw ~0.4 alpha black over top)
			make both the same bg color etc
				color object shared between them
	Bugs:
		Irregular gaps & incinsistant across screen ratios
*/

// Main Functions
window.onload = function() {
	g.canvas = document.getElementById("games-canvas");
	p.canvas = document.getElementById("projects-canvas");
	g.c = g.canvas.getContext("2d");
	p.c = p.canvas.getContext("2d");
	
	resize();
	setInterval(main, 1000/format.fps);
	setInterval(pMain, Math.floor(1000/format.messageSp));
	
	window.addEventListener("resize", resize);
	window.addEventListener("mousemove", function(e) {
		mouse.x = e.x;
		mouse.y = e.y;
	})
}
function main() {
	var rect = p.canvas.getBoundingClientRect();
	canvasesHover = pointInRect(mouse.x, mouse.y, 0, rect.top, window.innerWidth, rect.bottom);
	if(canvasesHover) {
		// if mouse hovering the canvases
		// set hover, rotate mouse and slice back and check collisions normally
		var boxX = Math.cos(-format.slant) * g.canvas.width,
			mouseX = Math.cos(-format.slant) * sg.angDist(0, 0, mouse.x, mouse.y);
		
		if(mouseX > boxX) {hover = "p"} else {hover = "g"}
		if(hover == "g") gMain();
	}
	
	draw(true);
	for(var i = 0; i < p.codeLines.length; i++) {
		p.codeLines[i].update();
	}
	draw(false);
}
function pMain() {
	if(hover == "p" && canvasesHover && document.hasFocus()){
		var len = Math.round(sg.randomRange(p.indentSize, (p.canvas.width-p.indentSize*p.cindent-format.padding) * 0.8));
		len = Math.floor(len / (p.indentSize / 2)) * (p.indentSize/2);
		
		var col = p.col.text;
		if(Math.random() <= p.col.commentChance) col = p.col.comment; 
		if(Math.random() <= p.col.breakChance && p.col.previous != p.col.bg) col = p.col.bg; 
		p.col.previous = col;
		
		p.codeLines.push(new CodeLine(p.cindent, len, 5, p.canvas.height, col));
		
		if(p.cindent > 0)p.cindent += Math.round(sg.randomRange(-1, 1)); else p.cindent += Math.round(Math.random());
		if(p.cindent == p.maxCindent) p.cindent += Math.round(sg.randomRange(0, 1));
		p.cindent = sg.clamp(p.cindent, 3, p.maxCindent);
	}
}
function gMain() {
	
}
function draw(clear) {
	if(clear) {
		// canvas clear and backgrounds
		g.c.clearRect(0, 0, g.canvas.width, g.canvas.height);
		colorRect(g.c, 0, 0, g.canvas.width, g.canvas.height, "#505050");
		
		p.c.clearRect(0, 0, p.canvas.width, p.canvas.height);
		colorRect(p.c, 0, 0, p.canvas.width, p.canvas.height, p.col.bg);
	}else{
		var dPadd = format.slantW * 0.6;
			format.padding = format.slantW * 0.2;
		// game canvas draw
		
		// draw
		colorRect(g.c, format.padding, format.padding, g.canvas.width-dPadd-format.padding, g.canvas.height-format.padding*2, "#404040");
		// clear edge
		g.c.fillStyle = "white";
		g.c.rotate(format.slant);
			var sx = Math.cos(-format.slant) * g.canvas.width,
				sy = Math.sin(-format.slant) * g.canvas.width;
			g.c.clearRect(sx, sy, g.canvas.width*0.5, g.canvas.height*1.5);
		g.c.rotate(-format.slant);
		
		// project canvas draw
		// clear project top padding
		colorRect(p.c, 0, 0, p.canvas.width, format.padding, p.col.bg);
		colorRect(p.c, 0, p.canvas.height-format.padding, p.canvas.width, format.padding, p.col.bg);
		
		// p title
		p.c.fillStyle = font.color;
		p.c.font = font.size + "px " + font.font;
		p.c.textBaseline = "bottom";
		p.c.fillText(p.title, dPadd*0.4, p.canvas.height - format.padding/3);
		
		// g title
		g.c.fillStyle = font.color;
		g.c.font = font.size + "px " + font.font;
		g.c.textBaseline = "top";
		g.c.textAlign = "right";
		g.c.fillText(g.title, g.canvas.width - dPadd*0.4, format.padding/3);
	}
}

// Objects
function CodeLine(indent, length, width, y, color) {
	this.indent = indent;
	this.length = length;
	this.width = width;
	this.y = y;
	this.ty = y - p.lineHeight;
	this.color = color;
	
	this.update = function(){
		if(hover == "p" && canvasesHover){
			this.y -= Math.floor((p.lineHeight / (format.messageSp + 1)) * 0.6);
			if(this.y < -p.lineHeight * 2) p.codeLines.shift();
		}
		this.draw();
	}
	this.draw = function(){colorRect(p.c, this.indent * p.indentSize, this.y, this.length, p.lineHeight, this.color);}
}

// Functions
function pointInRect(px,py,x1,y1,x2,y2){if(px>x1&&px<x2&&py>y1&&py<y2)return true;else return false;}
function resize(){
	var wd = window.innerWidth * 0.6,
		he = window.innerHeight * 0.75;
	
	p.canvas.width = wd;
	p.canvas.height = he;
	g.canvas.width = wd;
	g.canvas.height = he;
	p.canvas.style.zIndex = -1;
	
	// calculate slant
	var c = p.canvas.width * 2-window.innerWidth, 
		b = p.canvas.height;
		a = Math.hypot(b, c);
		
	format.slant = Math.acos((Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b));
	
	//scale box
	clearbox.width = c;
	clearbox.height = a;
	format.slantW = c;
	p.indentSize = c/6;
	p.lineHeight = c/12;
	
	var linkTable = document.getElementById("link-table");
	linkTable.style.height = he + "px";
	linkTable.style.top = $("#bigTitle").outerHeight(true) + "px";
}
function colorRect(c,x,y,width,height,color){c.fillStyle=color;c.fillRect(x,y,width,height);}