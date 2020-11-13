var g = {canvas:0, c:0,title:"Games"},
	p = {canvas:0, c:0,title:"Projects",
		codeLines:[],indentSize:50,lineHeight:20,cindent:0,maxCindent:7,lineBottom:0,lineSep:1.5,
		indentPerc:0.07,
		col:{bg:pageColors.dark1,text:pageColors.light1,breakChance:0.2,previous:0,chances:{
			comment:0.1,color:0.05
		}}
	},
	textMoveSp = 0.3,
	mouse = {x:0, y:0},
	hover = "",
	clearbox = {width:0, height:0},
	canvasesHover = false,
	format = {slant:0,padding:0,slantW:0,fps:30,messageSp:1},
	font = {size:70,font:"Sans-serif",color:pageColors.text};
	
/* 
	Todo:	
		make bg darker on the hover one 
			make dark color over inactive one, slightly blue?
			make both the same bg color etc
				color object shared between them
*/

// Main Functions
window.onload = function() {
	g.canvas = document.getElementById("games-canvas");
	p.canvas = document.getElementById("projects-canvas");
	g.c = g.canvas.getContext("2d");
	p.c = p.canvas.getContext("2d");
	
	resize();
	setInterval(main, 1000/format.fps);
	
	makeLines();
	
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
	}
	
	draw(true);
	for(var i = 0; i < p.codeLines.length; i++) {
		p.codeLines[i].update();
	}
	draw(false);
}
function draw(clear) {
	if(clear) {
		// canvas clear and backgrounds
		g.c.clearRect(0, 0, g.canvas.width, g.canvas.height);
		colorRect(g.c, 0, 0, g.canvas.width, g.canvas.height, pageColors.dark2);
		
		p.c.clearRect(0, 0, p.canvas.width, p.canvas.height);
		colorRect(p.c, 0, 0, p.canvas.width, p.canvas.height, p.col.bg);
	}else{
		var dPadd = format.slantW * 0.6;
			format.padding = format.slantW * 0.2;
		// game canvas draw
		
		// draw
		colorRect(g.c, format.padding, format.padding, g.canvas.width-dPadd-format.padding, g.canvas.height-format.padding*2, pageColors.light1);
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
function CodeLine(indent,length,y,color) {
	this.indent=indent;
	this.length=length;
	this.y=y;
	this.color=color;
	
	this.update=function(){
		if(hover=="p"&&canvasesHover){
			this.y-=format.messageSp;
			if(this.y<-p.lineHeight*2)this.y=p.lineBottom-(p.lineHeight*p.lineSep-p.lineHeight);
		}
		this.draw();
	}
	this.draw = function(){
		colorRect(
			p.c, 
			this.indent*p.indentSize, 
			this.y, 
			this.length*(p.canvas.width-this.indent*p.indentSize-format.padding), 
			p.lineHeight, 
			this.color
		);
	}
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
	font.size = p.canvas.width / 8;
	
	// resize code things
	p.indentSize = p.canvas.width * p.indentPerc;
	p.lineHeight = p.canvas.height / 35;
	
	var linkTable = document.getElementById("link-table");
	linkTable.style.height = he + "px";
	linkTable.style.top = $("#bigTitle").outerHeight(true) + "px";
}
function colorRect(c,x,y,width,height,color){c.fillStyle=color;c.fillRect(x,y,width,height);}
function makeLines() {
	// generate a looping pattern 5x the screen height's of lines(tab ends withth 1 of start value)
	var minTab = 2,
		tab = minTab,
		lineCount = (p.canvas.height / p.lineHeight) * 5,
		minWid = 0.03,
		col;
	
	for(var i=0;i<lineCount;i++){
		// move previous ones up
		for(var j=0;j<p.codeLines.length;j++)p.codeLines[j].y+=p.lineHeight*p.lineSep;
		
		// make new one
		if(tab == 1) tab += Math.round(Math.random()); else if(tab == p.maxCindent) tab += Math.round(sg.randomRange(-1, 0)); else tab += Math.round(sg.randomRange(-1, 1));
		
		col = p.col.text;
		if(Math.random() < p.col.chances.comment) col = pageColors.green;
		if(Math.random() < p.col.chances.color) col = sg.choose(
			pageColors.red,
			pageColors.green,
			pageColors.blue,
			pageColors.orange,
			pageColors.yellow
		);
		
		p.codeLines.push(new CodeLine(tab, Math.max(Math.random(), minWid), format.padding, col));
		
	}
	p.lineBottom = p.codeLines[0].y;
}