
// TODO: Document functions
function addNavBarList(navBarList_, text_, anchor_) {
    const navBarSection = document.createElement("li");

    const anchorSection = document.createElement("a");
    anchorSection.setAttribute("href", anchor_);

    navBarSection.className = "MenuLink";
    anchorSection.textContent = text_;

    navBarSection.appendChild(anchorSection);

    navBarList_.appendChild(navBarSection);
}

// Grab the nav bar list ID
const navBarList = document.querySelector("#NavbarList");

// Create the sections in the nav bar
// TBD these names will change to be reflective of the tour landing page
addNavBarList(navBarList, "Information", "#section1");
addNavBarList(navBarList, "Highlights", "#section2");
addNavBarList(navBarList, "Reviews", "#section3");
addNavBarList(navBarList, "Contact", "#section4");

// Smooth scrolling to a section
section2 = document.querySelector("#section2");
section2anchor = document.querySelector('a[href ="#section2"]');

section2anchor.addEventListener("click", function (evt) {
    evt.preventDefault();
    section2.scrollIntoView({ behavior: "smooth" });
})

console.log(navBarList);

function isElementInViewport(element) {

    let elementBound = element.getBoundingClientRect();

    return (
        elementBound.top >= 0 &&
        elementBound.left >= 0 &&
        elementBound.bottom <= window.innerHeight &&
        elementBound.right <= window.innerWidth
    );
}

header1 = document.getElementById("section1");
console.log(header1);
console.log(isElementInViewport(header1));

document.addEventListener("scroll", function activateSection(evt) {

    const sections = document.querySelectorAll("section");
    const navMenuItems = document.querySelectorAll(".MenuLink");

    for (let i = 0; i < sections.length; i++) {

        section_h2 = sections[i].childNodes[1].childNodes[1];

        if (isElementInViewport(sections[i])) {
            // Add active class in section/navbar
            sections[i].classList.add("active");
            section_h2.classList.add("active");
            navMenuItems[i].classList.add("activeNav");
        }
        else {
            // Remove active class in section/navbar
            sections[i].classList.remove("active");
            section_h2.classList.remove("active");
            navMenuItems[i].classList.remove("activeNav");
        }
    }
});

// Code to hide fixed nav bar
let timer = null;

window.addEventListener("scroll", function hideNavBar(evt) {

    if (timer !== null) {
        clearTimeout(timer);
        // TBD separation of concerns, JS should not be changing the style!
        document.querySelector("header").style.top = "0em";
    }

    // TBD does this mousemove eventlistener stop when this "scroll event listener" goes out of scope?
    // TBD may need to be put in a separate function and use removeEventListener to clean up.
    // TBD this function may need to be added outside of scroll event listener such that if the mouse is in the header, stay fixed.  Otherwise disappear.
    //              This is when scrolling, then going the mouse into the header before timeout, then coming out of the header, the header stays fixed.  The header should disappear when coming out of the header.
    window.addEventListener("mousemove", function mouseYinNavBar(evt) {

        // If mouse hovers over header when scrolling (but before timeout), keep it fixed
        // TBD magic hardcoded numbers, this depends on the header em value set up in CSS
        if (evt.y < 16 * 20) {
            clearTimeout(timer);
            return;
        }

    });

    // Make sure fixed header stays when at the top of the page
    if (window.scrollY === 0) {
        clearTimeout(timer);
        return;
    }

    timer = setTimeout(function hideNavBarTimeout() {
        // TBD magic hardcoded numbers, this depends on the header em value set up in CSS
        // TBD separation of concerns
        document.querySelector("header").style.top = "-20em";
    }, 1500);
});


// Code for button to go to top of page
topButton = document.getElementById("topButton");

// Show the button when scrolling
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > window.screen.height || document.documentElement.scrollTop > window.screen.height) {
        topButton.classList.remove("topButtonHide");
        topButton.classList.add("topButton");
    } else {
        topButton.classList.add("topButtonHide");
        topButton.classList.remove("topButton");
    }
}

// When the user clicks on the button, scroll to the top of the document
function goToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}