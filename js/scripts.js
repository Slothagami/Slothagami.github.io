jQuery(document).ready(function(){
	// Build page
	var html='<img id="bar-toggle" src="../images/logo.png" /><div id="side-bar"><p id="bar-close" > &times; </p><a class="bar-link" href="../index.html" > Home </a><a class="bar-link" href="../games.html" > Games </a><a class="bar-link" href="../coding-projects.html" > Projects </a><a class="bar-link" href="https://slothagami.itch.io/" > Itch.io </a><a class="bar-link" href="https://www.patreon.com/Slothagami" > Patreon </a></div>';
    //In the end...
    $('#side-in').empty().append(html);
	// for pages not in folders
	var html='<img id="bar-toggle" src="images/logo.png" /><div id="side-bar"><p id="bar-close" > &times; </p><a class="bar-link" href="index.html" > Home </a><a class="bar-link" href="games.html" > Games </a><a class="bar-link" href="coding-projects.html" > Projects </a><a class="bar-link" href="https://slothagami.itch.io/" > Itch.io </a><a class="bar-link" href="https://www.patreon.com/Slothagami" > Patreon </a></div>';
    //In the end...
    $('#side-base').empty().append(html);
	// Start by hiding rescources
	jQuery("#postHeader").next("ul").hide();
	// Handle showing resources
	jQuery("#postHeader").click(function(){jQuery(this).next("ul").slideToggle();});
	// Project show/hide buttons
	jQuery(".project-article").hide();
	jQuery(".project-head").click(function(){jQuery(this).next(".project-article").slideToggle();});
	// Add bit to code sections
	jQuery(".pseudo").prepend("<p class='codeTitle'> <b>Pseudocode Explanation:</b> </p>");
	// Make the new text ^above^ a button to slideToggle() the code example (start hidden on mobile)
	jQuery(".codeTitle").click(function(){jQuery(this).next("code").slideToggle();});
	$('#side-bar').animate({width: 'toggle'}, 0);
	// Navbar (css to hide navbar (width:0; display:none) buttons too
	$("#bar-toggle").click(function() {
		$('#side-bar').animate({"width": 'toggle'});
	});
	$("#bar-close").click(function() {
		$('#side-bar').animate({"width": 'toggle'});
	});
	// Check for mobile
	if(sg.onMobile()) {
		// change font sizes
		$("h3, h2, h1, p, ul, ol, #postHeader, .categoryName").css({"font-size" : 48});
		$("code").css({"font-size" : 32});
		// update widths
		$("#bodydiv, #Posts").css({"width" : "100%","display": "block"});
		$("project-head").css({"width" : "100%","font-size":50});
		// update navbar to mobile version
		$("#navbar a").css({"font-size":50});
		// Update homepage
		$("#gamesButton, #postsButton").css({
			"float":"none",
			"width":"100%",
			"padding":"5px 5px 70px 5px"
		});
		$(".square-image").css({"width":"90%"});
		// big title bigger
		$("#bigTitle").css({"font-size":"10vw"});
		// Add space at top
		$("#bodydiv").prepend("<br /><br /><br />");
		$(".codeexample").css({"width":"97%","padding":"60px"});
		// side bar
		$(".bar-link, #bar-close").css({"font-size":80});
		$("#bar-toggle").css({"width":"20%"});
		$("#topdesc").css({"line-height":"1.4"});
		// General
		$("div").css({"width":"100%","float":"none"});
		// disable interavtives
		$(".interactive-replacement").css({"display":"block"});
		$(".interactive").css({"display":"none"})
	}
});