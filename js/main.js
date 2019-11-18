// get navbar links and assign it to array
const navbarlinks = document.getElementById('navbar').querySelectorAll('a');

// add event same event listener to all navbar links 
for (let i = 0; i < navbarlinks.length; i++) {
    navbarlinks[i].addEventListener('click', changeActiveNavbarLink);
}

// get offsettop of navbar
// let sticky = navbar.offsetTop;

//-EVENTS AND FUNCTIONS--------------------------------------------------------------------------------------------------------


window.onscroll = function () {
    // fixNavBar()
};
window.onload = function () {

};

// Change the current active navbar link
function changeActiveNavbarLink() {
    // deactivate current navbar link
    for (let i = 0; i < navbarlinks.length; i++) {
        navbarlinks[i].classList.remove('active-nav-link');
    }
    // activate new navbar link
    this.classList.add('active-nav-link');
}

// function - add the sticky class to the navbar when its scroll position is reached. Remove "sticky" when the scroll position is left.
// function fixNavBar() {
//     if (window.pageYOffset > sticky) {
//         navbar.classList.add('fixed-top');
//         document.getElementById('main').style.paddingTop = '8vh';
//     } else {
//         navbar.classList.remove('fixed-top');
//         document.getElementById('main').style.paddingTop = '0vh';
//     }
// };
