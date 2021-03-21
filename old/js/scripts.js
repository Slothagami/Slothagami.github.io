// get doc colors from style.css
function getCssVar(name){return getComputedStyle(document.documentElement).getPropertyValue(name)}
pageColors={bg:getCssVar("--bg-color"),dark1:getCssVar("--color-dark-1"),dark2:getCssVar("--color-dark-2"),light1:getCssVar("--color-light-1"),green:getCssVar("--color-green"),blue:getCssVar("--color-blue"),yellow:getCssVar("--color-yellow"),red:getCssVar("--color-red"),orange:getCssVar("--color-orange"),text:getCssVar("--color-text"),text2:getCssVar("--color-text-2")}
jQuery(document).ready(function(){
	var html='<img id="bar-toggle" src="../images/logo.png" /><div id="side-bar"><p id="bar-close" > &times; </p><a class="bar-link" href="../index.html" > Home </a><a class="bar-link" href="../games.html" > Games </a><a class="bar-link" href="../coding-projects.html" > Projects </a><a class="bar-link" href="https://slothagami.itch.io/" > Itch.io </a><a class="bar-link" href="https://www.patreon.com/Slothagami" > Patreon </a></div>';
    $('#side-in').empty().append(html);
	// for pages not in folders
	var html='<img id="bar-toggle" src="images/logo.png" /><div id="side-bar"><p id="bar-close" > &times; </p><a class="bar-link" href="index.html" > Home </a><a class="bar-link" href="games.html" > Games </a><a class="bar-link" href="coding-projects.html" > Projects </a><a class="bar-link" href="https://slothagami.itch.io/" > Itch.io </a><a class="bar-link" href="https://www.patreon.com/Slothagami" > Patreon </a></div>';
    $('#side-base').empty().append(html);
	// Start by hiding rescources
	$("#postHeader").next("ul").hide();
	// Handle showing resources
	$("#postHeader").click(function(){jQuery(this).next("ul").slideToggle();});
	// Project show/hide buttons
	$(".project-article").hide();
	$(".project-head").click(function(){jQuery(this).next(".project-article").slideToggle();});
	// Add bit to code sections
	$(".pseudo").prepend("<p class='codeTitle'> <b>Pseudocode Explanation:</b> </p>");
	$(".codeTitle").click(function(){jQuery(this).next("code").slideToggle();});
	$('#side-bar').animate({width: 'toggle'}, 0);
	// Navbar (css to hide navbar (width:0; display:none) buttons too
	$("#bar-toggle").click(function(){$('#side-bar').animate({"width": 'toggle'});});
	$("#bar-close").click(function(){$('#side-bar').animate({"width": 'toggle'});});
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