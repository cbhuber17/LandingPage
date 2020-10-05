
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

// TODO: Smooth scrolling to section
// section.scrollIntoView({behavior: 'smooth'});

// document.querySelector(this.getAttribute('href')).scrollIntoView({
//     behavior: 'smooth'
// });


console.log(navBarList);