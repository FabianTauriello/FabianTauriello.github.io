// navbar height
const navHeight = '10vh';

// get nav bar
let navbar = document.getElementById('navbar');

// get offsettop of navbar
let sticky = navbar.offsetTop;

//-EVENTS AND FUNCTIONS--------------------------------------------------------------------------------------------------------


aboutLink.onclick = function () {

};
window.onscroll = function () {
    fixNavBar()
};
window.onload = function () {
    console.log(navbar)
};


// function - add the sticky class to the navbar when its scroll position is reached. Remove "sticky" when the scroll position is left.
function fixNavBar() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add('fixed-top');
        document.getElementById('main').style.paddingTop = '8vh';
    } else {
        navbar.classList.remove('fixed-top');
        document.getElementById('main').style.paddingTop = '0vh';
    }
};
