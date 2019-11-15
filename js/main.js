// navbar height
const navHeight = '10vh';

// get nav bar
const navbar = document.querySelector('#navbar');

// get offsettop of navbard
const sticky = navbar.offsetTop;

// get sections
const aboutSection = document.getElementById('about');

// get navbar links
const aboutLink = document.getElementById('aboutLink');

//-EVENTS AND FUNCTIONS--------------------------------------------------------------------------------------------------------


aboutLink.onclick = function() {
    
};
window.onscroll = function() {
    fixNavBar()
};
window.onload = function() {
    
};


// function - add the sticky class to the navbar when its scroll position is reached. Remove "sticky" when the scroll position is left.
function fixNavBar() {
    if(window.pageYOffset > sticky) {
        navbar.classList.add('fixed-top');
        document.getElementById('main').style.paddingTop = '10vh';
    } else {
        navbar.classList.remove('fixed-top');
        document.getElementById('main').style.paddingTop = '0vh';
    }
};
