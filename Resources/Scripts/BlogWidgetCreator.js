class ArticleInfo {
    constructor(articlePath, mainTitle, titleImagePath, titleImageAltText) {
        this.articlePath = articlePath;
        this.mainTitle = mainTitle;
        this.titleImagePath = titleImagePath;
        this.titleImageAltText = titleImageAltText;
    }
}

// Call this function to create blog widgets, passing it a widget creation function
// that uses the fetched ArticleInfos, based on links with the .BlogLink class on the page
// This is not convoluded at all.
function createBlogWidgets(createWidget) {
    let blogLinks = document.querySelectorAll(".BlogLink");
    for (blogLink of blogLinks) {
        getArticleInfo(blogLink.href)
        .then(articleInfo => createWidget(articleInfo));
    }
    for (let i = blogLinks.length - 1; i >= 0; i--) {
        blogLinks[i].parentNode.removeChild(blogLinks[i]);
    }
}

async function getArticleInfo(articlePath) {
    let response = await fetch(articlePath)
    let articleHtml = await response.text();

    let parser = new DOMParser();
    let doc = parser.parseFromString(articleHtml, "text/html");
    let mainTitleNode = doc.querySelector("#MainTitle");
    let titleImageNode = doc.querySelector("#TitleImage");

    let mainTitle = mainTitleNode.textContent;
    let titleImagePath = titleImageNode.src;
    let titleImageAltText = titleImageNode.alt;

    return new ArticleInfo(articlePath, mainTitle, titleImagePath, titleImageAltText);
}

async function createBlogWidget(articleInfo) {
    // Build article widget parts
    let link = document.createElement("a");
    link.href = articleInfo.articlePath;
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.src = articleInfo.titleImagePath;
    img.alt = articleInfo.titleImageAltText;
    let figcaption = document.createElement("figcaption");
    figcaption.innerText = articleInfo.mainTitle.trim();

    // Compose article widget parts and add to document
    figure.appendChild(img);
    figure.appendChild(figcaption);
    link.appendChild(figure);
    document.querySelector("#BlogWidgets").appendChild(link); // TODO Append in order of date of creation of article... Teehee.
}

createBlogWidgets(createBlogWidget);