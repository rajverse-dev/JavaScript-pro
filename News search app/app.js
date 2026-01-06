const API_KEY = "6c550daf459b42b8a672063d32007e21";

const searchBtn=document.getElementById("searchBtn");
const newsContainer=document.getElementById("newsContainer");
const loading=document.getElementById("loading");

searchBtn.addEventListener("click",fetchNews);

async function fetchNews() {
   const query=document.getElementById("searchInput").value;
   const category=document.getElementById("category").value; 
   const country=document.getElementById("country").value;

   loading.style.display="block";
   newsContainer.innerHTML="";

   let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`;

   if (query) url += `&q=${query}`;
   if (category) url += `&category=${category}`;

   try{
    const response=await fetch(url);
    const data=await response.json();

    if(data.articles.length==0){
        newsContainer.innerHTML="<p>No news found </p>";
        return;
    }

    displayNews(data.articles);

   }catch(error){
    newsContainer.innerHTML="<p>Error fetching news </p>";
   }finally{
    loading.style.display="none";
   }

}

function displayNews(articles){
    articles.forEach(article => {
        const card=document.createElement("div");
        card.className="news-card";
        card.innerHTML = `
         <img src="${article.urlToImage || 'https://via.placeholder.com/300'}">
        <h3>${article.title}</h3>
         <p>${article.description || ""}</p>
        <a href="${article.url}" target="_blank">Read more</a>
    `;

    newsContainer.appendChild(card);
        
    });
}

