
// TBD: Document functions
/*
 * Create the navigation bar dynamically - builds menu items that has anchors to sections on the page 
 * @param  {HTMLElement} navBarList The navigation bar list element (from ID)
 * @param  {String} text Text to describe the menu item to create (and be linked by the anchor)
 * @param  {String} anchor The attribute of href in the anchor (i.e. the link to the section on the page)
 */
function addNavBarList(navBarList, text, anchor) {

    const navBarSection = document.createElement("li");
    const anchorSection = document.createElement("a");

    navBarSection.className = "MenuLink";

    anchorSection.setAttribute("href", anchor);
    anchorSection.textContent = text;

    navBarSection.appendChild(anchorSection);
    navBarList.appendChild(navBarSection);
}

/*
 * Check to see if an element is in the current view port
 * @param  {HTMLElement} navBarList The navigation bar list element (from ID)
 * @return {Boolean} true if the element is in the current view port, otherwise false
 */
function isElementInViewport(element) {

    let elementBound = element.getBoundingClientRect();

    return (
        elementBound.top >= 0 &&
        elementBound.left >= 0 &&
        elementBound.bottom <= window.innerHeight &&
        elementBound.right <= window.innerWidth
    );
}

/*
 * Show the "Top" button when passing the fold of the page
 */
function scrollShowTopButton() {

    if (document.body.scrollTop > window.screen.height || document.documentElement.scrollTop > window.screen.height) {
        topButton.classList.remove("topButtonHide");
        topButton.classList.add("topButton");
    } else {
        topButton.classList.add("topButtonHide");
        topButton.classList.remove("topButton");
    }
}

/*
 *  When the user clicks on the top button, scroll to the top of the document
 */
function goToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// TBD have main() function?
// TBD braek down code further based on Mosh's good coding practices

// Get all tags that use <section>, then the ID can be extracted
const allSections = document.body.getElementsByTagName("section");

// Grab the nav bar list element
const navBarList = document.querySelector("#NavbarList");

// Array to hold section elements for event listener smooth scrolling
const sectionElements = [];

// Iterate over each section to:
// Populate the nav bar with each menu item
// Create an anchor link for each menu item
// Allow smooth scrolling for each menu item
for (let i = 0; i < allSections.length; i++) {

    // Get the section id and create the link to it
    sectionIDanchorlink = '#' + allSections[i].id;

    // Create the text for each navigation bar menu item
    let menuText = '';

    switch (i) {
        case 0:
            menuText = "Information";
            break;
        case 1:
            menuText = "Highlights";
            break;
        case 2:
            menuText = "Reviews";
            break;
        case 3:
            menuText = "Contact";
            break;

        default:
            menuText = '';
            break;
    }

    addNavBarList(navBarList, menuText, sectionIDanchorlink);

    // Create smooth scrolling experience to the section when clicking on each menu item in the nav bar
    sectionElements.push(document.querySelector(sectionIDanchorlink));
    anchorQueryText = `a[href ="${sectionIDanchorlink}"]`;
    sectionAnchor = document.querySelector(anchorQueryText);

    sectionAnchor.addEventListener("click", function (evt) {
        evt.preventDefault();
        sectionElements[i].scrollIntoView({ behavior: "smooth" });
    });

}

// Highlight a particular section when it is in the current view port
// Also highlight the section in the navbar when in the current view port
document.addEventListener("scroll", function activateSection(evt) {

    const sections = document.querySelectorAll("section");
    const navMenuItems = document.querySelectorAll(".MenuLink");

    for (let i = 0; i < sections.length; i++) {

        section_h2 = sections[i].childNodes[1].childNodes[1];

        // Add/remove active class in section/navbar
        if (isElementInViewport(sections[i])) {
            sections[i].classList.add("active");
            section_h2.classList.add("active");
            navMenuItems[i].classList.add("activeNav");
        }
        else {
            sections[i].classList.remove("active");
            section_h2.classList.remove("active");
            navMenuItems[i].classList.remove("activeNav");
        }
    }
});

// Code to hide fixed nav bar when scrolling
let timer = null;

// Get the fixed header height so we know when to keep it fixed if the mouse y-coordinate comes in the header region
const fixedHeader = document.querySelector('header');
const headerHeight = fixedHeader.offsetHeight;

// Hide the navigation bar upon scrolling
window.addEventListener("scroll", function hideNavBar(hideEvt) {

    // Keep the header when scrolling
    if (timer !== null) {
        clearTimeout(timer);
        // TBD separation of concerns, JS should not be changing the style!
        fixedHeader.style.top = "0px";
    }

    // If mouse hovers over header when scrolling (but before timeout), keep it fixed
    window.addEventListener("mousemove", function mouseYinNavBar(mouseEvt) {

        if (mouseEvt.y < headerHeight) {
            clearTimeout(timer);
            return;
        }
    });

    // Make sure fixed header stays when viewing at the top of the page
    if (window.scrollY === 0) {
        clearTimeout(timer);
        return;
    }

    // Remove the header when scrolling stops
    timer = setTimeout(function hideNavBarTimeout() {
        // TBD separation of concerns
        fixedHeader.style.top = `-${headerHeight}px`;
    }, 1000);
});

// Show the "scroll to top" button when scrolling past the fold of the page
window.onscroll = function () { scrollShowTopButton() };