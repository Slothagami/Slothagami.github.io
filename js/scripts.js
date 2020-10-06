// <script type="text/javascript" src="Scripts.js"></script>

// Linked files run on load
//alert("Hello");

jQuery(document).ready(function() { // wait untill jQuery is ready and run code in brackets.
	// Start by hiding rescources
	jQuery(".resources").next("ul").hide();
	// Handle showing resources
	jQuery(".resources").click(function() {
		jQuery(this).next("ul").slideToggle();
	});
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) { // ckeck for mobile
		jQuery("p").style.font-size = 32;
	}
	
	/*
	// Keep put scroll in a variable
	jQuery(window).scroll(function() { // every time you sroll
		var windowHeight = jQuery(window).height();
		var windowScroll = jQuery(window).scrollTop();
		var windowBottom = windowHeight + windowScroll;
	});
	
	// make a function
	jQuery.fn.myFunction = function() {
		return this.each(function() { // run relative to the current object
			// can use the 'this' keyword in here.
			
		});
	}
	*/
	
	
	/*
		jQuery(this).parents(".classname").method();
		jQuery(thing).append("<HTML>"); // adds html
		
		METHODS
		theThing.methodName();
		hide
		fadeOut
		slideUp
		slideDown
		slideToggle
		click(function(){  }) // when clicked
		next("typeOfThing") // goes to child
		addClass("className")
		append("<html>") // adds html
		load("filename class")
	*/
});