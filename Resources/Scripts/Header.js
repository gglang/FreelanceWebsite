// TODO BUG FIX: When small phones are on landscape, the sticky header will make the menu not fully visible

// This is needed to wait for the navbar to actually be
// inserted into the document by another script 
// (and wait for the document reload) teehee
document.addEventListener("readystatechange", afterLoadSetup);

let logo;
let navbar;
let mobileMenu;
function afterLoadSetup(event) {
    if (event.target.readyState === "complete") {
        let menuButton = document.querySelector("#MenuButton");
        menuButton.addEventListener("click", menuButtonClicked);

        window.addEventListener("scroll", headerScruncher,
            { capture: false, passive: true }); /* Let UI thread do stuff before my event */

        // Init some state... teehee
        logo = document.getElementById("LogoLink");
        navbar = document.querySelector("nav");
        mobileMenu = document.getElementById("Menu")
    }
}

function menuButtonClicked() {
    // Remove the focus outline from a mouseclick!
    this.blur();

    // Animate the icon, not the button, so that it's click area doesn't change
    this.children[0].classList.toggle('rotationTransformActive');

    if(mobileMenu.classList.contains("active")) {
        mobileMenu.style.maxHeight = "0px";
        mobileMenu.style.padding = "0rem 1rem";
        mobileMenu.style.borderTop = "0px solid var(--main-accent-color)";
    } else {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px"; // Note real values are needed for CSS transitions, not things like initial/unset
        mobileMenu.style.padding = "1rem 1rem";
        mobileMenu.style.borderTop = "3px solid var(--main-accent-color)";
    }
    mobileMenu.classList.toggle("active");
}

function headerScruncher() {
    let scrunchHeight = 20;
    if (document.documentElement.scrollTop > scrunchHeight || document.body.scrollTop > scrunchHeight) {
        logo.style.fontSize = "1.25rem"
        logo.style.lineHeight = "1.25rem";
        navbar.style.padding = "5px";
    }
    else {
        logo.style.fontSize = "1.625rem"
        logo.style.lineHeight = "1.6rem";
        navbar.style.padding = "10px";
    }
}