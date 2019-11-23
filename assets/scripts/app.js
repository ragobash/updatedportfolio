var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };

// Carousel
/*-----------------------------------------------------------------
-----------------------------------------------------------------
----------------------- GLOBAL VARIABLES ------------------------
-----------------------------------------------------------------
-----------------------------------------------------------------*/


// Used to add a numeric id on slide creation to let us target the element later  
var slideIndex = 0;
// Tells us which slide we are on
var currentSlideIndex = 0;
// An Array to hold all the slides
var slideArray = [];


/*-----------------------------------------------------------------
-----------------------------------------------------------------
----------------------- THE TEMPLATE ---------------------------
-----------------------------------------------------------------
-----------------------------------------------------------------*/



// Template for creating a custom Slide object
function Slide(title, subtitle, background, link, link2 ) {
	this.title = title;
	this.subtitle = subtitle;
	this.background = background;
  this.link = link;
  this.link2 = link2
	// we need an id to target later using getElementById
	this.id = "slide" + slideIndex;
	// Add one to the index for the next slide number
	slideIndex++;
	// Add this Slide to our array
	slideArray.push(this);
}



/*-----------------------------------------------------------------
-----------------------------------------------------------------
----------------------- SLIDE CREATION ---------------------------
-----------------------------------------------------------------
-----------------------------------------------------------------*/


// Creating our slide objects, you can make as many as you want

var palindrome = new Slide(
	"Is It A Palindrome?", 
	"A tool to be used to check if a string is a palindrome", 
  "assets/Images/palindrome.png", 
  "https://ragobash.github.io/palindrome/",
  "https://github.com/ragobash/palindrome"
);

var clickyGame = new Slide(
	"Clicky Game", 
	"A game in which you click to match brand logos", 
	"assets/Images/clickygame.png", 
  "https://ragobash.github.io/clicky-game/",
  "https://github.com/ragobash/clicky-game"
);

var triviaGame = new Slide(
	"Cheers: A Trivia Game", 
	"A generic trivia game!", 
	"assets/Images/TriviaGame.png", 
  "https://ragobash.github.io/TriviaGame/",
  "https://github.com/ragobash/TriviaGame"
);

var giphy = new Slide(
	"Giphy Peanut Butter", 
	"Gif Search Tool", 
	"assets/Images/giphy.png", 
  "https://ragobash.github.io/giphy/",
  "https://github.com/ragobash/giphy"
);

var scraper = new Slide(
	"Scraper New Network", 
	"News Scraping Tool", 
	"assets/Images/scraper.png", 
  "https://intense-chamber-76790.herokuapp.com/articles",
  "https://github.com/ragobash/mongo_scraper"
);


/*-----------------------------------------------------------------
-----------------------------------------------------------------
----------------------- ADD TO WEB PAGE ---------------------------
-----------------------------------------------------------------
-----------------------------------------------------------------*/



function buildSlider(){
	// A variable to hold all our HTML
	var myHTML;
	
	// Go through the Array and add the code to our HTML
	for(var i = 0; i < slideArray.length; i++) {
		
		myHTML += "<div id='" + slideArray[i].id + 
		"' class='singleSlide' style='background-image:url(" + slideArray[i].background + ");'>" + 
		"<div class='slideOverlay'>" + 
		"<h1>" + slideArray[i].title + "</h1>" +
		"<h4>" + slideArray[i].subtitle + "</h4>" +
    "<a href='" + slideArray[i].link + "' target='_blank'>Project</a>" +
    "<a href='" + slideArray[i].link2 + "' target='_blank'>Github</a>" +
		"</div>" +
		"</div>";	
		
	}
	
	// Print our HTML to the web page
	document.getElementById("mySlider").innerHTML = myHTML;
		
	// Display the first slide
	document.getElementById("slide" + currentSlideIndex).style.left = 0;

}

// Create our slider
buildSlider();





/*-----------------------------------------------------------------
-----------------------------------------------------------------
----------------------- SLIDER CONTROLS ---------------------------
-----------------------------------------------------------------
-----------------------------------------------------------------*/



// Navigates to the previous slide in the list
function prevSlide(){
	// Figure out what the previous slide is
	var nextSlideIndex;
	// If we are at zero go to the last slide in the list
	if (currentSlideIndex === 0 ) {
		nextSlideIndex = slideArray.length - 1;
	} else {
		// Otherwise the next one is this slide minus 1
		nextSlideIndex = currentSlideIndex - 1;
	}	
	
	// Setup the next slide and current slide for animations
	document.getElementById("slide" + nextSlideIndex).style.left = "-100%";
	document.getElementById("slide" + currentSlideIndex).style.left = 0;
	
	// Add the appropriate animation class to the slide
	document.getElementById("slide" + nextSlideIndex).setAttribute("class", "singleSlide slideInLeft");
	document.getElementById("slide" + currentSlideIndex).setAttribute("class", "singleSlide slideOutRight");
	
	// Set current slide to the new current slide
	currentSlideIndex = nextSlideIndex;
}


// Navigates to the next slide in the list
function nextSlide(){
	// Figure out what the next slide is
	var nextSlideIndex;
	// If we are at the last slide the next one is the first (zero based)
	if (currentSlideIndex === (slideArray.length - 1) ) {
		nextSlideIndex = 0;
	} else {
		// Otherwise the next slide is the current one plus 1
		nextSlideIndex = currentSlideIndex + 1;
	}	
	
	// Setup the next slide and current slide for animations
	document.getElementById("slide" + nextSlideIndex).style.left = "100%";
	document.getElementById("slide" + currentSlideIndex).style.left = 0;
	
	// Add the appropriate animation class to the slide
	document.getElementById("slide" + nextSlideIndex).setAttribute("class", "singleSlide slideInRight");
	document.getElementById("slide" + currentSlideIndex).setAttribute("class", "singleSlide slideOutLeft");
	
	// Set current slide to the new current slide
	currentSlideIndex = nextSlideIndex;
}
