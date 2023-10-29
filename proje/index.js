const API_KEY = "4e4141008b254003bc6376f84be5670a"
const url = "https://newsapi.org/v2/top-headlines?country=tr&apiKey="

window.addEventListener("load", () => fetchNews("Turkey"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    
    if (data && data.articles) {
        bindData(data.articles);
    } else {
        console.error("API'den geçersiz veri alındı.");
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    if (Array.isArray(articles)) {
        articles.forEach((article) => {
            if (article && article.urlToImage) {
                const cardClone = newsCardTemplate.content.cloneNode(true);
                fillDataInCard(cardClone, article);
                cardsContainer.appendChild(cardClone);
            }
        });
    }
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Istanbul",
    });
    

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const images = document.querySelectorAll(".slider-image");

    function showImage(index) {
        if (index < 0) {
            index = images.length - 1;
        } else if (index >= images.length) {
            index = 0;
        }

        images.forEach((image, i) => {
            if (i === index) {
                image.classList.add("active");
            } else {
                image.classList.remove("active");
            }
        });

        currentIndex = index;
    }

    function nextImage() {
        showImage(currentIndex + 1);
    }

    setInterval(nextImage, 3000); // Her 3 saniyede bir geçiş yapacak
});




