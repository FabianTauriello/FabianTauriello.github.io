// get navbar links and assign it to array
const navbarlinks = document.getElementById('navbar').querySelectorAll('.navLink');

// create variable to store whether the mobile nav menu is displayed
let mobileMenuIsDisplayed = false;

// Wait for everything to load (including background image), before displaying welcome message
window.addEventListener('load', (event) => {
    animateWelcomeMessage();
});

// Animate welcome message
function animateWelcomeMessage() {
    // Set up home page title divs
    const message = [
        ['H', 'E', 'L', 'L', 'O', ':)'],
        ['T', 'H', 'A', 'N', 'K', 'S', '_', 'F', 'O', 'R', '_', 'V', 'I', 'S', 'I', 'T', 'I', 'N', 'G']
    ];
    let animationDelay = .7;
    for (let i = 0; i < message.length; i++) {
        let parentRow = (i == 0) ? document.getElementById("home-msg-first-row") : document.getElementById("home-msg-second-row");
        for (j = 0; j < message[i].length; j++) {
            // create letter container
            let wrapperDiv = document.createElement("div");
            wrapperDiv.className = 'letter-wrapper';

            // create letter element
            let innerSpan = document.createElement("span");
            innerSpan.className = 'span-letter';
            innerSpan.textContent = message[i][j];
            //  add a second delay before starting second row
            if (i == 1 && j == 0) {
                innerSpan.style.animationDelay = (animationDelay += 1) + "s";
            } else {
                innerSpan.style.animationDelay = (animationDelay += 0.03) + "s";
            }

            // combine both above by making letter element child of letter container
            wrapperDiv.appendChild(innerSpan);

            // append new element to document
            parentRow.appendChild(wrapperDiv);
        }
    }
}

// Change the current active navbar link when section enters frame
window.addEventListener("scroll", function (event) {
    let scrollPos = this.scrollY;
    const aboutOffset = document.getElementById("about").offsetTop;
    const projectsOffset = document.getElementById("projects").offsetTop;
    const blogOffset = document.getElementById("blog").offsetTop;
    const contactOffset = document.getElementById("contact").offsetTop;
    if (scrollPos >= aboutOffset && scrollPos < projectsOffset) {
        changeActiveNavbarLink(navbarlinks[3]);
    } else if (scrollPos >= projectsOffset && scrollPos < blogOffset) {
        changeActiveNavbarLink(navbarlinks[2]);
    } else if (scrollPos >= blogOffset && scrollPos < contactOffset) {
        changeActiveNavbarLink(navbarlinks[1]);
    } else if (scrollPos >= contactOffset) {
        changeActiveNavbarLink(navbarlinks[0]);
    } else {
        changeActiveNavbarLink(navbarlinks[4]);
    }
});

// Change the current active navbar link
function changeActiveNavbarLink(element) {
    // deactivate current navbar link
    for (let i = 0; i < navbarlinks.length; i++) {
        navbarlinks[i].classList.remove('active-nav-link');
    }
    // activate new navbar link
    element.classList.add('active-nav-link');
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