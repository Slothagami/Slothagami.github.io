// <script type="text/javascript" src="Scripts.js"></script>

jQuery(document).ready(function() { // wait until jQuery is ready and run code in brackets.
	// Start by hiding rescources
	jQuery("#postHeader").next("ul").hide();
	// Handle showing resources
	jQuery("#postHeader").click(function() {
		jQuery(this).next("ul").slideToggle();
	});
	// Project show/hide buttons
	jQuery(".project-article").hide();
	jQuery(".project-head").click(function() {
		jQuery(this).next(".project-article").slideToggle();
	});
	
	// Add bit to code sections
	jQuery(".codeexample").prepend("<p class='codeTitle'> <b>Pseudocode Explanation:</b> </p>");
	// Make the new text ^above^ a button to slideToggle() the code example (start hidden on mobile)
	jQuery(".codeTitle").click(function() {
		jQuery(this).next("code").slideToggle();
	});
	
	/*
	$(window).resize(function() {
		if($(window).width() < 900) {
			// Games page
			$(".game-box").css({
				"width":"100%",
				"height":"auto",
				"float":"none"
			});
			$(".game-box img").css({
				"width":"100%",
				"height":"auto"
			});
			$(".game-box-container").css({
				"width":"100%",
				"height":"auto"
			});
		}
	});
	*/
	
	// Check for mobile
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		// change font sizes
		jQuery("h3, h2, p, ul, ol, #postHeader, .categoryName").css({
			"font-size" : 48
		});
		jQuery("code").css({
			"font-size" : 32
		});
		// update widths
		jQuery("#bodydiv, #Posts").css({
			"width" : "100%",
			"display": "block"
		});
		jQuery("project-head").css({
			"width" : "100%",
			"font-size":50
		});
		// update navbar to mobile version
		jQuery("#navbar a").css({
			"font-size":50
		});
		// Update homepage
		jQuery("#gamesButton, #postsButton").css({
			"float":"none",
			"width":"100%",
			"padding":"5px 5px 70px 5px"
		});
		jQuery(".square-image").css({
			"width":"90%"
		});
		// big title bigger
		jQuery("#bigTitle").css({
			"font-size":"10vw"
		});
		// Add space at top
		jQuery("#bodydiv").prepend("<br /><br /><br />");
		// Hide code boxes
		jQuery(".codeexample code").hide();
		
		//$(".codeexample code").prepend("<span class='number'> Code may not display properly on mobile. </span><br />");
		
		jQuery(".codeexample").css({
			"width":"97%"
		});
		
		// Games page
		$(".game-box").css({
			"width":"100%",
			"height":"auto",
			"float":"none",
			"border":"7px solid #303030"
		});
		$(".game-box img").css({
			"width":"100%",
			"height":"auto"
		});
		$(".game-box-container").css({
			"width":"100%",
			"height":"auto"
		});
		$(".empty").css({
			"display":"none"
		});
		
		// General
		$("div").css({
			"width":"100%",
			"float":"none"
		});
	}
});