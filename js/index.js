var g={canvas:0,c:0},p={canvas:0,c:0},slant=0,mouse={x:0,y:0},fps=30,hover="",
	clearbox={width:0,height:0},padding=50,slantW=0,codeLines=[],indentSize=50,
	lineHeight=15,cindent=0,maxCindent=7,messageSp=3;
	
window.onload=function(){
	g.canvas=document.getElementById("games-canvas");p.canvas=document.getElementById("projects-canvas");
	g.c=g.canvas.getContext("2d");p.c=p.canvas.getContext("2d");
	
	resize();
	setInterval(main, 1000/fps);
	setInterval(pMain, 1000/messageSp);
	window.addEventListener("resize",resize);
	window.addEventListener("mousemove",function(e){
		mouse.x = e.x;
		mouse.y = e.y;
	})
}

function main(){
	var rect = p.canvas.getBoundingClientRect();
	if(pointInRect(mouse.x,mouse.y, 0,rect.top,window.innerWidth,rect.bottom)){
		// if mouse hovering the canvases
		// set hover, rotate mouse and slice back and check collisions normally
		var boxX = Math.cos(-slant) * g.canvas.width,mouseX = Math.cos(-slant) * sg.angDist(0, 0, mouse.x, mouse.y);
		if(mouseX > boxX){hover="p"}else{hover="g"}
		if(hover=="g")gMain();
	}
	draw();
	for(var i = 0; i < codeLines.length; i++) {
		codeLines[i].update();
	}
	// clear project top padding
	colorRect(p.c, 0, 0, p.canvas.width, padding, "#303030");
	colorRect(p.c, 0, p.canvas.height-padding, p.canvas.width, padding, "#303030");
}
function draw() {
	var dPadd = slantW*.6,padding=slantW*.2;
	// game canvas draw
	g.c.clearRect(0,0,g.canvas.width,g.canvas.height);
	colorRect(g.c, 0, 0, g.canvas.width, g.canvas.height, "#505050")
	// draw
	colorRect(g.c, padding, padding, g.canvas.width-dPadd-padding, g.canvas.height-padding*2, "#404040");
	
	// clear edge
	g.c.fillStyle="white";
	g.c.rotate(slant);
		var sx=Math.cos(-slant)*g.canvas.width,sy=Math.sin(-slant)*g.canvas.width;
		g.c.clearRect(sx, sy, g.canvas.width*0.5, g.canvas.height*1.5);
	g.c.rotate(-slant);
	// project canvas draw
	p.c.clearRect(0,0,p.canvas.width,p.canvas.height);
	colorRect(p.c,0,0,p.canvas.width,p.canvas.height,"#303030");
}
function pointInRect(px,py,x1,y1,x2,y2){if(px>x1&&px<x2&&py>y1&&py<y2)return true;else return false;}
function resize(){
	var wd=window.innerWidth*.6,he=window.innerHeight*.75;p.canvas.width=wd;p.canvas.height=he;g.canvas.width=wd;g.canvas.height=he;p.canvas.style.zIndex = -1;
	// calculate slant
	var c=p.canvas.width*2-window.innerWidth,b=p.canvas.height;a=Math.hypot(b,c);slant=Math.acos((Math.pow(a,2)+Math.pow(b,2)-Math.pow(c,2))/(2*a*b));
	//scale box
	clearbox.width=c;clearbox.height=a;slantW=c;
	var linkTable=document.getElementById("link-table");
	linkTable.style.height = he + "px";
	linkTable.style.top = $("#bigTitle").outerHeight(true) + "px";
}
function colorRect(c,x,y,width,height,color){c.fillStyle=color;c.fillRect(x,y,width,height);}
function pMain() {
	if(hover=="p"){
		var len = Math.round(sg.randomRange(indentSize, p.canvas.width-indentSize*cindent-padding));
		len = Math.floor(len / (indentSize / 2)) * (indentSize/2)
		
		codeLines.push(new CodeLine(
			cindent, 
			len,
			5,
			p.canvas.height
		));
		if(cindent > 0)cindent+=Math.round(sg.randomRange(-1, 1)); else cindent += Math.round(Math.random());
		if(cindent == maxCindent)cindent+=Math.round(sg.randomRange(0, 1));
		cindent = sg.clamp(cindent, 3, maxCindent);
	}
}
function gMain() {
	
}
function CodeLine(indent, length, width, y) {
	this.indent = indent;
	this.length = length;
	this.width = width;
	this.y = y;
	this.ty = y-lineHeight;
	
	this.update=function(){
		this.ty -= lineHeight / messageSp;
		this.y = sg.lerp(this.y, this.ty, 0.3);
		if(this.y < -lineHeight*2) codeLines.shift();
		this.draw();
	}
	this.draw=function(){
		colorRect(
			p.c, 
			this.indent*indentSize, 
			this.y, 
			this.length,
			lineHeight,
			"white"
		)
	}
}