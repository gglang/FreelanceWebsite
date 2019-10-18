function loadHTMLIntoID(filePath, id) {
    let htmlContainer = document.querySelector("#"+id);
    if(!htmlContainer) {
        return;
    }

    let request = new XMLHttpRequest();
    request.open('GET', filePath);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            let response = request.responseText;
            htmlContainer.innerHTML = response;
        } else {
            console.log("error: "+request.statusText);
        }
    }
    request.send();
}

// Add to headers and footers of all pages that use this script
loadHTMLIntoID("/Resources/HTMLTemplates/topbar.html","MainHeader");
loadHTMLIntoID("/Resources/HTMLTemplates/footer.html", "MainFooter")
loadHTMLIntoID("/Resources/HTMLTemplates/contactForm.html", "ContactForm")
loadHTMLIntoID("/Resources/HTMLTemplates/moreArticles.html", "MoreArticles")