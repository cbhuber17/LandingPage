
// TODO: Document functions
function addNavBarList(navBarList_, text_, anchor_) {
    const navBarSection = document.createElement('li');

    const anchorSection = document.createElement('a');
    anchorSection.setAttribute('href', anchor_);

    navBarSection.className = 'MenuLink';
    anchorSection.textContent = text_;

    navBarSection.appendChild(anchorSection);

    navBarList_.appendChild(navBarSection);
}

// Grab the nav bar list ID
const navBarList = document.querySelector('#NavbarList');

// Create the sections in the nav bar
// TBD these names will change to be reflective of the tour landing page
addNavBarList(navBarList, 'Section 1', '#section1');
addNavBarList(navBarList, 'Section 2', '#section2');
addNavBarList(navBarList, 'Section 3', '#section3');
addNavBarList(navBarList, 'Section 4', '#section4');

// Smooth scrolling to a section
section2 = document.querySelector('#section2');
section2anchor = document.querySelector('a[href ="#section2"]');

section2anchor.addEventListener('click', function (evt) {
    evt.preventDefault();
    section2.scrollIntoView({ behavior: 'smooth' });
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

document.addEventListener('scroll', function activateSection(evt) {

    const sections = document.querySelectorAll('section');
    const navMenuItems = document.querySelectorAll('.MenuLink');

    for (let i = 0; i < sections.length; i++) {

        section_h2 = sections[i].childNodes[1].childNodes[1];

        if (isElementInViewport(sections[i])) {
            // Add active class in section/navbar
            sections[i].classList.add('active');
            section_h2.classList.add('active');
            navMenuItems[i].classList.add('activeNav');
        }
        else {
            // Remove active class in section/navbar
            sections[i].classList.remove('active');
            section_h2.classList.remove('active');
            navMenuItems[i].classList.remove('activeNav');
        }
    }
});


// console.log(Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]));

// Code to hide fixed nav bar
let timer = null;

window.addEventListener('scroll', function hideNavBar(evt) {

    if (timer !== null) {
        clearTimeout(timer);
        // TBD separation of concerns, JS should not be changing the style!
        document.querySelector("header").style.top = "0em";
    }

    window.addEventListener('mousemove', function (evt) {

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
        document.querySelector("header").style.top = "-20em";
    }, 1500);
});
