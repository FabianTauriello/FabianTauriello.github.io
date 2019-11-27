// get navbar links and assign it to array
const navbarlinks = document.getElementById('navbar').querySelectorAll('.navLink');

// add event same event listener to all navbar links 
for (let i = 0; i < navbarlinks.length; i++) {
    navbarlinks[i].addEventListener('click', changeActiveNavbarLink);
}

const mobileNavLinks = document.getElementById('mobileNavLinks');

const navbar = document.getElementById('navbar');

let mobileMenuIsDisplayed = false;

//-EVENTS AND FUNCTIONS--------------------------------------------------------------------------------------------------------


window.onscroll = function () {

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

function toggleNavLinks() {

    if(!mobileMenuIsDisplayed) {
        navbar.style.boxShadow = 'none';
        mobileNavLinks.classList.add('openMobileNavLinks');
        mobileNavLinks.classList.remove('closeMobileNavLinks');
    } else {
        navbar.style.boxShadow = '0 0.5rem 1rem #00000026';
        mobileNavLinks.classList.add('closeMobileNavLinks');
        mobileNavLinks.classList.remove('openMobileNavLinks');
    }

    mobileMenuIsDisplayed = !mobileMenuIsDisplayed;
    
}