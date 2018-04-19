var y,x,mod;

window.addEventListener('scroll', getScroll);
window.addEventListener('scroll', fadeIn);

function fadeIn() {
	var text = document.getElementById("main");
	y = window.scrollY;
	x = window.innerHeight;
	mod = y / x;
	//console.log(mod);

	if(mod >= .7) {
		text.style.opacity = 0;
	}
	else {
		text.style.opacity = 1;
	}
	
} 


/*These two functions determine the filter color change by window.scrollY
Colors are yet to be picked
*/
function getScroll() {
	y = window.scrollY;
	x = window.innerHeight;
	mod = y / x;
    mod = Math.floor(mod * 10) / 10;
	//console.log(`linear-gradient(to top, rgba(0, 0, 0,0), rgba(${Math.floor(mod * 66)}, ${Math.floor(mod * 134)}, ${Math.floor(mod * 244)},1))`);
	updateColor();
}

function updateColor() {
    /* Current chosen colors are 
    rgb(66,134,244), rgb(110,255,255), rgb(255,150,50) 
    mod is scroll position from 0 - 3
    formula is previousMaxValue +/- (modReducedTo(0-1) * newDesiredValue) */
    var filter = document.getElementById('filter');

    if(mod < 1) {
        //console.log("R: " + Math.floor(mod * 66));
        filter.style.background = `linear-gradient(to bottom, rgba(0, 0, 0,0), rgba(${Math.floor(mod * 66)}, ${Math.floor(mod * 134)}, ${Math.floor(mod * 244)},1))`;
    }
    else if(mod < 2) {
        //console.log("R: " + (66 + Math.floor((mod - 1) * 44)));
        filter.style.background = `linear-gradient(to bottom, rgba(0, 0, 0,0), rgba(${66 + Math.floor((mod - 1) * 44)}, ${134 + Math.floor((mod - 1) * 121)}, ${244 + Math.floor((mod - 1) * 11)},1))`;
    }
    else {
        //console.log("R: " + (110 + Math.floor((mod - 2) * 145)));
        filter.style.background = `linear-gradient(to bottom, rgba(0, 0, 0,0), rgba(${110 + Math.floor((mod - 2) * 145)}, ${255 - Math.floor((mod - 2) * 105)}, ${255 - Math.floor((mod - 2) * 205)},1))`;
    }


	//filter.style.background = `linear-gradient(to bottom, rgba(0, 0, 0,0), rgba(${Math.floor(mod * 66)}, ${Math.floor(mod * 134)}, ${Math.floor(mod * 244)},1))`;
}

/* This code is used to replicate scroll-behavior:smooth on unsupported browsers
Used with permission from itnewb.com via stackoverflow answer
TODO: migrate to a smoothscroll polyfill module from npm */

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}

function smoothScroll(eID) {
    var startY = currentYPosition();
	var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
	if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
    return false;
}

//This is collecting the links, adding event listeners to them, and preventing the default immediate jump on click
var collectedLinks = document.getElementsByClassName('smooth');
[].forEach.call(collectedLinks, function(element, index) {
	//This string is getting getting the id of the target of each link and sending it to smoothScroll()
	//console.log(element.href.substring(element.href.indexOf('#')+1));
	element.id = "assignedId" + index; 
	element.addEventListener('click', function(e){
		smoothScroll(element.href.substring(element.href.indexOf('#')+1));
		e.preventDefault();
	})
});

/* clickLink.addEventListener('click', function(e){
  smoothScroll(this.id);
  e.preventDefault();
}); */

