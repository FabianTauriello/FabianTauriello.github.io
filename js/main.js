// get navbar links and assign it to array
const navbarlinks = document.getElementById('navbar').querySelectorAll('.navLink');

// add event listener to all navbar links 
for (let i = 0; i < navbarlinks.length; i++) {
    navbarlinks[i].addEventListener('click', changeActiveNavbarLink);
}

// create variable to store whether the mobile nav menu is displayed
let mobileMenuIsDisplayed = false;

// Set up home page title divs
const message = [
    ['H', 'E', 'L', 'L', 'O', ':)'],
    ['T', 'H', 'A', 'N', 'K', 'S', '_', 'F', 'O', 'R', '_', 'S', 'T', 'O', 'P', 'P', 'I', 'N', 'G', '_', 'B', 'Y']
];
let animationDelay = .7;
for (let i = 0; i < message.length; i++) {
    let parentRow = (i == 0) ? document.getElementById("home-msg-first-row") : document.getElementById("home-msg-second-row");
    for (j = 0; j < message[i].length; j++) {
        // create letter container
        let wrapperDiv = document.createElement("div");
        wrapperDiv.className ='letter-wrapper';

        // create letter element
        let innerSpan = document.createElement("span");
        innerSpan.className = 'span-letter';
        innerSpan.textContent = message[i][j];
        //  add a second delay before starting second row
        if(i == 1 && j == 0) {
            innerSpan.style.animationDelay = (animationDelay += 1) + "s";
        } else {
            innerSpan.style.animationDelay = (animationDelay += 0.03) + "s";
        }

        // combine both above by making letter element child of letter container
        wrapperDiv.appendChild(innerSpan);

        // append new element to document
        parentRow.appendChild(wrapperDiv);

        // console.log(newElement);
    }
}


//-EVENTS AND FUNCTIONS--------------------------------------------------------------------------------------------------------


window.onscroll = function () {

};
window.onload = function () {
    // console.log(message[0][0]);

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

    const mobileNavLinks = document.getElementById('mobileNavLinks');
    const navbar = document.getElementById('navbar');

    if (!mobileMenuIsDisplayed) {
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