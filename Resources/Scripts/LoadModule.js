function loadHTMLIntoID(filePath, id, dependencyScript) {
    let htmlContainer = document.querySelector("#" + id);
    if (!htmlContainer) {
        return;
    }

    let request = new XMLHttpRequest();
    request.open('GET', filePath);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            let response = request.responseText;
            htmlContainer.innerHTML = response;
            addScript(dependencyScript);
        } else {
            console.log("error: " + request.statusText);
        }
    }
    request.send();
}

function addScript(JSFileName) {
    if(!JSFileName) {
        return;
    }
    
    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.src = JSFileName;
    document.body.appendChild(js);
}

// Add to headers and footers of all pages that use this script
loadHTMLIntoID("/Resources/HTMLTemplates/topbar.html", "MainHeader", "/Resources/Scripts/Header.js");
loadHTMLIntoID("/Resources/HTMLTemplates/footer.html", "MainFooter")
loadHTMLIntoID("/Resources/HTMLTemplates/contactForm.html", "ContactForm")
loadHTMLIntoID("/Resources/HTMLTemplates/moreArticles.html", "MoreArticles")