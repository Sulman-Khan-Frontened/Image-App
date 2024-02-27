// sidebar sticky logic

window.addEventListener("scroll", (e) => {
    if (window.scrollY == 0) {
        document.body.classList.remove("sticky");
    } else if (window.scrollY > 0) {
        document.body.classList.add("sticky");
    }
});



// Load Dummy Images
window.addEventListener("DOMContentLoaded", loadInitialImages);

let loadedImagesCount = 0;

async function loadInitialImages() {
    const resultContainer = document.querySelector(".result-container");
    const loader = createLoader();
    resultContainer.appendChild(loader);

    const clientId = "s2eFNAoLtlgUeANTvpgT9mwCC8knUNWXVc0YObPh9dI";
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${clientId}&query=random&count=${6}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    appendImages(resultContainer, data);
    loadedImagesCount += data.length;

    loader.style.display = "none";
    appendLoadMoreButton(resultContainer);
}

async function loadMoreImages() {
    const resultContainer = document.querySelector(".result-container");
    const loader = createLoader();
    resultContainer.appendChild(loader);

    const clientId = "s2eFNAoLtlgUeANTvpgT9mwCC8knUNWXVc0YObPh9dI";
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${clientId}&query=random&count=${6}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    appendImages(resultContainer, data);
    loadedImagesCount += data.length;


    const loadMoreButton = document.querySelector(".load-more-button");
    loadMoreButton.remove()


    if (loadedImagesCount < 30) {
        loader.style.display = "none";
        appendLoadMoreButton(resultContainer);
    }
}

function appendImages(container, images) {
    images.forEach(imageData => {
        const article = document.createElement("article");
        article.classList.add("image-container");

        article.innerHTML = `
            <div class="image">
                <img src="${imageData.urls.regular}">
            </div>
            <div class="info">
                <div class="name">
                    <table>
                        <tr>
                            <td>Photographer: </td>
                            <td class="photographer-name">${imageData.user.name}</td>
                        </tr>
                        <tr>
                            <td>Website: </td>
                            <td>Unsplash.com</td>
                        </tr>
                    </table>
                </div>
                <div class="download-btn">
                    <a href="${imageData.links.download}" class="download" target="_blank">Download</a>
                </div>
            </div>
        `;

        container.appendChild(article);
    });
}

function appendLoadMoreButton(container) {
    const loadMoreButton = document.createElement("button");
    loadMoreButton.classList.add("load-more-button");
    loadMoreButton.textContent = "Load More";
    loadMoreButton.addEventListener("click", loadMoreImages);
    container.appendChild(loadMoreButton);
}

function createLoader() {
    const loader = document.createElement("div");
    loader.classList.add("loader");
    return loader;
}


// Offline
window.onoffline = function Offline() {
    const createdOffline = document.createElement("div");
    createdOffline.innerText = "Internet Connection Lost";
    createdOffline.classList.add("Offline");
    document.body.appendChild(createdOffline);
}
window.ononline = () => {
    var a = document.querySelector(".Offline");
    a.innerText = "Internet Connected";
    a.classList.add("Connected")
    setTimeout(() => {
        a.remove();
    }, 1500)
};

//  search query
const searchbtn = document.querySelector("#searchBtn");
const searchVal = document.querySelector("input[type='search']");
const resultContainer = document.querySelector(".result-container");
const Li = document.querySelectorAll("li");
let searchTerm = "";

Li.forEach(e => e.addEventListener("click", (link) => {
    Li.forEach(e => e.classList.remove("active-link"));
    link.currentTarget.classList.add("active-link");
    searchTerm = link.currentTarget.innerText.toLowerCase();
    search()
}))

searchbtn.addEventListener("click", () => {
    searchTerm = searchVal.value;
    search()

});


async function search() {
    document.querySelectorAll("article").forEach(e => e.remove())
    document.querySelector(".load-more-button").remove()
    const loader = createLoader();
    resultContainer.appendChild(loader);

    const clientId = "s2eFNAoLtlgUeANTvpgT9mwCC8knUNWXVc0YObPh9dI";
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${clientId}&query=${searchTerm}&count=${6}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    appendImages(resultContainer, data);
    loadedImagesCount += data.length;

    loader.style.display = "none";
    appendLoadMoreButton(resultContainer);
};


