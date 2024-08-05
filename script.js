const API_KEY = "51f8aeb609d04ddba750d848bf25aa89";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("Top"));

function relod(){
    window.location.relod();
}

async function fetchNews(query){5
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(JSON.stringify(data));
    bindData(data.articles);   
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    }); 
}
 
function fillDataInCard(cardClone, article){
    const newsImage = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImage.src = article.urlToImage; 
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})

    newsSource.innerHTML = `${article.source.name} · ${date}` 

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let currentSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search");
const searchText = document.getElementById("input-text");
searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = null;
})

function newsKeyPress(e){
    var key=e.keyCode || e.which;
     if (key==13){
        const query = searchText.value;
        if(!query) return;
        fetchNews(query);
        currentSelectedNav?.classList.remove('active');
        currentSelectedNav = null;
     }
   }




// Stocks Section

const API_TOKEN = "cogq40pr01qj0pq2u8egcogq40pr01qj0pq2u8f0";
const STOCK_URL = "https://finnhub.io/api/v1/quote?symbol="
let stockQuery = "AAPL";
window.addEventListener("load", () => fetchStock(stockQuery));

async function fetchStock(stockQuery){5
    const stockRes = await fetch(`${STOCK_URL}${stockQuery}&token=${API_TOKEN}`);
    const stockData = await stockRes.json();
    console.log(JSON.stringify(stockData));
    bindStockData(stockData);
}

function bindStockData(data){
    const stockCardContainer = document.getElementById("stockCardContainer");
    const stockCardTemplate = document.getElementById("stockCardTemplate");

    //stockCardContainer.innerHTML = "";
    const stockCardClone = stockCardTemplate.content.cloneNode(true);
    fillDataInStockCard(stockCardClone, data);
    stockCardContainer.appendChild(stockCardClone);
}

function fillDataInStockCard(stockCardClone, data){
    const stockSymbol = stockCardClone.querySelector('#stock-symbol');
    const stockPrice = stockCardClone.querySelector('#stock-price');
    const stockPriceChange = stockCardClone.querySelector('#price-change');

    stockSymbol.innerHTML = stockQuery; 

    stockPrice.innerHTML = data.c;
    stockPriceChange.innerHTML = data.d;
    if(data.d < 0){
        stockPriceChange.classList.add('negative');
    }
    else{
        stockPriceChange.classList.add('positive');
    };
};

const addButton = document.getElementById("add");
const addText = document.getElementById("symbol-input");
addButton.addEventListener('click', ()=> {
    stockQuery = addText.value;
    if(!stockQuery) return;
    fetchStock(stockQuery);
});

function stockKeyPress(e){
    var key=e.keyCode || e.which;
     if (key==13){
        stockQuery = addText.value;
        if(!stockQuery) return;
        fetchStock(stockQuery);
     }
   }