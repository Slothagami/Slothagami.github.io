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
		jQuery("p").css({
			"font-size" : 48
		});
		jQuery("code").css({
			"font-size" : 48
		});
		jQuery("bodydiv").css({
			"width" : "100%"
		});
	}
});