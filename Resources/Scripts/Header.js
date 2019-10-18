// This is needed to wait for the navbar to actually be
// inserted into the document by another script 
// (and wait for the document reload) teehee
document.addEventListener("readystatechange", afterLoadSetup);

let logo;
let navbar;
function afterLoadSetup(event) {
    if (event.target.readyState === "complete") {
        let menuButton = document.querySelector("#MenuButton");
        menuButton.addEventListener("click", menuButtonClicked);

        window.addEventListener("scroll", headerScruncher,
            { capture: false, passive: true }); /* Let UI thread do stuff before my event */

        // Init some state... teehee
        logo = document.getElementById("LogoLink");
        navbar = document.querySelector("nav");
    }
}

function menuButtonClicked() {
    // Remove the focus outline from a mouseclick!
    this.blur();

    // Animate the icon, not the button, so that it's click area doesn't change
    this.children[0].classList.toggle('rotationTransformActive');
}


function headerScruncher() {
    let scrunchHeight = 20;
    if (document.documentElement.scrollTop > scrunchHeight || document.body.scrollTop > scrunchHeight) {
        logo.style.width = "15%";
        navbar.style.padding = "5px";
    }
    else {
        logo.style.width = "25%";
        navbar.style.padding = "10px";
    }
}