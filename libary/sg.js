/*
	unverified-scripts: none
	
	<script type="text/javascript" src="https://slothagami.github.io/libary/sg.js"></script>
	
	Checklist
	Check for mobile
	hsv script
	color script (give hue, sat and value is 70%, 90%)
	random color (color script with random value for hue)
*/

var sg = {
	clamp:function(value, min, max){return Math.min(Math.max(value,min),max);},
	randomRange:function(min, max){return Math.random()*(max-min)+min;},
	angDist:function(x1,y1,x2,y2){return Math.hypot(Math.abs(x1-x2),Math.abs(y1-y2));},
	ang:function(x1,y1,x2,y2){return Math.atan2(y2-y1,x2-x1);},
	overshootInc:function(value,incriment,limit){var addition=value+incriment;if(Math.sign(incriment)==1) addition=Math.min(addition,limit);else addition=Math.max(addition,limit);return addition;},
	resize:function(canvas){canvas.style.position="absolute";canvas.width=window.innerWidth;canvas.height=window.innerHeight;},
	lerp:function(value, target, ammount){return value+(target-value)*ammount;},
	choose:function(){return arguments[Math.floor(Math.random()*(arguments.length))];},
	onMobile: function(){return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);}
}