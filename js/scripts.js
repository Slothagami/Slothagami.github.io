// <script type="text/javascript" src="Scripts.js"></script>

// Linked files run on load
//alert("Hello");

jQuery(document).ready(function() { // wait untill jQuery is ready and run code in brackets.
	// Start by hiding rescources
	jQuery("#postHeader").next("ul").hide();
	// Handle showing resources
	jQuery("#postHeader").click(function() {
		jQuery(this).next("ul").slideToggle();
	});
	
	// Add bit to code sections
	jQuery(".codeexample").prepend("<p class='codeTitle'> Pseudocode Explanation: </p>");
	//jQuery(".codeexample").next("p").addClass("codeTitle");
	
	// Check for mobile
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		// change font sizes
		jQuery("h3, h2, p, ul, #postHeader").css({
			"font-size" : 48
		});
		jQuery("code").css({
			"font-size" : 32
		});
		// update widths
		jQuery("bodydiv").css({
			"width" : "100%"
		});
		jQuery("game-head").css({
			"width" : "100%",
			"font-size":50
		});
		// update navbar to mobile version
		jQuery("#navbar a").css({
			"font-size":48
		});
		// Update homepage
		jQuery("#gamesButton, #postsButton").css({
			"float":"none",
			"width":"100%"
		});
		jQuery("#wIKimg").css({
			"width":"90%"
		});
		// big title bigger
		jQuery("#bigTitle").css({
			"font-size":"10vw"
		});
		// Add space at top
		jQuery("#bodydiv").prepend("<br /><br /><br />");
	}
});