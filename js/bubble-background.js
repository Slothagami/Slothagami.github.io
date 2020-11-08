/* To use: add bubbleSetup() to main window.onload, bubbleMouseMove(event) to mouse move, and bubbleResize() to main resize event*/
var cv=document.getElementById("bg-canvas"),
	bb={
		canvas:cv,
		c:cv.getContext("2d"),
		fps:30,
		mouse:{x:0,y:0}
	},
	bubble={
		rad:{min:30,max:60},
		color:["#151515","#101010"],
		number:60,
		speed:{min:.001,max:.003},
		grow:{ammount:1.2,speed:0.1}
	},
	bubbles=[];
	
	function bg(){
		bb.c.clearRect(0,0,bb.canvas.width,bb.canvas.height);
		for(var b=0;b<bubbles.length;b++)bubbles[b].update()
	}
	
	function colorRect(b,s,e,t,a){
		bb.c.fillStyle=a,
		bb.c.fillRect(b,s,e,t)
	}
	
	function colorCircle(b,s,e,t){
		bb.c.beginPath(),
		bb.c.fillStyle=t,
		bb.c.arc(b,s,e,0,2*Math.PI,!1),
		bb.c.fill()
	}
	
	function bubbleResize(){
		sg.resize(bb.canvas),
		bb.canvas.style.position="fixed";
		
		bubbles = [];
		for(var b=0;b<bubble.number;b++){
			var s=Math.random()*Math.PI*2;
			var e=Math.sin(s);
			var t=Math.cos(s);
			var a=sg.randomRange(bubble.rad.min,bubble.rad.max);
			var i=sg.randomRange(bubble.speed.min,bubble.speed.max);
			
			bubbles.push(new Bubble(
				sg.randomRange(a,bb.canvas.width-a),
				sg.randomRange(a,bb.canvas.height-a),
				a,
				e*i,
				t*i,
				bubble.color[Math.floor(Math.random()*bubble.color.length)]
			));
		}
	}
	
	function Bubble(b,s,e,t,a,i){
		this.x=b,
		this.y=s,
		this.rad=e,
		this.dRad=e,
		this.hs=t,
		this.vs=a,
		this.color=i,
		this.update=function(){
			this.x+=this.hs,
			this.y+=this.vs,
				
			(this.x+this.rad>=bb.canvas.width||this.x-this.rad<=0)&&(this.hs*=-1),
			(this.y+this.rad>=bb.canvas.height||this.y-this.rad<=0)&&(this.vs*=-1),
			
			sg.angDist(bb.mouse.x,bb.mouse.y,this.x,this.y)<=this.rad?
				this.rad=sg.lerp(this.rad,this.dRad*bubble.grow.ammount,bubble.grow.speed):
				this.rad=sg.lerp(this.rad,this.dRad,bubble.grow.speed),
			
			this.draw()
		},
		this.draw=function(){
			colorCircle(this.x,this.y,this.rad,this.color)
		}
	};
	
	bubbleMouseMove=function(b){
		bb.mouse.x=b.x,
		bb.mouse.y=b.y
	}
	
	bubbleSetup=function(){
		bubbleResize();
		setInterval(bg,1e3/bb.fps)
		//bubbleMouseMove();
	}