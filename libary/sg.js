/*
	unverified-scripts: none
	
	<script type="text/javascript" src="sg.js"></script>  in head
	
	Checklist
	Check for mobile
	hsv script
	color script (give hue, sat and value is 70%, 90%)
	random color (color script with random value for hue)
*/

var sg = {
	clamp:function(value, min, max){return Math.min(Math.max(value,min),max);},
	randomRange:function(min, max){return Math.random()*(max-min)+min;},
	angDist:function(x1,y1,x2,y2){var xdif=Math.abs(x1-x2),ydif=Math.abs(y1-y2);return Math.hypot(xdif,ydif);},
	ang: function(x1, y1, x2, y2) { // angle between two points
		var angle = 0;
		var a = Math.abs(x1-x2);// law of cos & pythagoras
		var b = Math.abs(y1-y2);
		var c = Math.hypot(a, b);
		var yy = x2-x1;// move it so x1 = y1 = 0
		var xx = y2-y1;
		var angle = Math.atan2(xx, yy); // angle from [0, 0] to [xx, yy]
		
		return angle;
	},
	overshootInc: function(value, incriment, limit) {
		// stops the value going over the limit (any direction)
		// eg. x = overshotInc(x, hsp, target.x), all valuse can be + or -
		var addition = value + incriment; // add them together
		var dir = Math.sign(incriment);
		if(dir == 1) { // cap to limit
			addition = Math.min(addition, limit);
		}else{
			addition = Math.max(addition, limit);
		}
		return addition;
	},
	resize: function(canvas) {
		canvas.style.position = "absolute"; // stops unessicary scrollbars
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	},
	lerp:function(value, target, ammount){return value+(target-value)*ammount;},
	choose:function(){return arguments[Math.floor(Math.random()*(arguments.length))];}
}