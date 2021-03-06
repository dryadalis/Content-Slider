// navigation to HTML
var links = document.querySelectorAll(".itemLinks");
var wrapper = document.querySelector("#wrapper");
 
// store the position of the content that is currently displayed
var activeLink = 0;
 
// setup the event listeners
for (var i = 0; i < links.length; i++) {
    var link = links[i];
    link.addEventListener('click', setClickedItem, false);
 
    // identify the item for the activeLink
    link.itemID = i;
}
 
// set first item as active
links[activeLink].classList.add("active");
 
// first resets all of links to non active state
// second updates a value of activeLink
// third passes a reference to clicked element to the changePosition
function setClickedItem(e) {
    removeActiveLinks();
    resetTimer();
 
    var clickedLink = e.target;
    activeLink = clickedLink.itemID;
 
    changePosition(clickedLink);
}
 
function removeActiveLinks() {
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
    }
}
 
// Handle changing the slider position as well as ensure
// the correct link is highlighted as being active
function changePosition(link) {
    var position = link.getAttribute("data-pos");
 
    var translateValue = "translate3d(" + position + ", 0px, 0)";
    wrapper.style.transform = translateValue;
 
    link.classList.add("active");
}


// Slide the content automatically 

let timeoutID;

function startTimer() {
    // wait 2 sec before calling goInactive
    timeoutID = window.setInterval(goToTheNextItem, 2000);
}

startTimer();

function resetTimer() {
    //stop the timer
    window.clearInterval(timeoutID);
    startTimer();
}

function goToTheNextItem() {
    removeActiveLinks(); 

    // check if there is more content ahead or whether the slider should go back to beginning
    if(activeLink < links.length - 1) {
        activeLink++
    } else {
        activeLink = 0;
    }
    let newLink = links[activeLink];
    changePosition(newLink);
}


