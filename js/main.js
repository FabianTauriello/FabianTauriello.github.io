//-DOM ELEMENT CAPTURE------------------------------------------------------------------------------------------

// get nav bar
const navbar = document.querySelector('#navbar')

const sticky = navbar.offsetTop;

//-EVENTS--------------------------------------------------------------------------------------------------------


// when the user scrolls the page, execute fixNavBar function
window.onscroll = function() {fixNavBar()};

//-FUNCTIONS-----------------------------------------------------------------------------------------------------

// function - add the sticky class to the navbar when its scroll position is reached. Remove "sticky" when the scroll position is left.
function fixNavBar() {
    if(window.pageYOffset > sticky) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
}

//-------------------------------------------------------------------------------------------