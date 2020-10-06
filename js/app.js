
// TODO: Document function
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



// element is the dom element, i.e. what's returned from document.querySelector('selector')

// function isOnScreen(element, buffer) {
//     //buffer is optional and allows you to return true when  
//     //the element is going to appear to the screen  
//     buffer = typeof buffer === 'undefined' ? 0 : buffer;
//     // Get element's position in the viewport
//     const bounding = element.getBoundingClientRect();
//     console.log(bounding);
//     console.log(window.innerWidth);
//     console.log(window.innerHeight);

//     // Check if element is in the viewport 
//     if (bounding.top >= buffer &&
//         bounding.left >= buffer &&
//         bounding.right <= (window.innerWidth - buffer) &&
//         bounding.bottom <= (window.innerHeight - buffer)) {
//         return true;
//     } else {
//         return false;
//     }
// }

// section2 = document.querySelector('header');
// isSec2OnScreen = isOnScreen(section2, 0);
// console.log(isSec2OnScreen);