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
