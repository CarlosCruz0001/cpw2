const API_URL = "https://api.tvmaze.com/search/shows?";
const $ = document.getElementById.bind(document);

const searchShows = (event) => {
  event.preventDefault();

  const query = $("query").value;

  // '  banana   '.trim() ->  'banana'
  // '   '.trim() -> ''
  // 'Sidney Sousa'.trim() -> 'Sidney Sousa'
  if (query.trim()) {
    $("not-found-message").style.display = "none";

    const loadingAnimation = `
        <img src="/img/loading.gif" alt="Procurando...">
    `;
    $("shows-area").innerHTML = loadingAnimation;

    fetch(API_URL + new URLSearchParams({ q: query })).then((response) =>
      // Converte a resposta do serviço para JSON
      response.json().then((results) => {
        $("shows-area").innerHTML = "";

        if (results.length === 0) {
          console.log("Nenhum resultado");
          $("not-found-message").style.display = "block";
          return;
        }

        // Parte importante, ela limpa o localSorage a cada nova busca.
        localStorage.removeItem("searchResults");

        // Laço de repetição para tratar cada um dos shows
        results.forEach((r) => {
          //const show = r.show
          const { show } = r;
          const { id, name, image } = show;

          const imageUrl = image ? image.medium : "/img/noimage.png";

          const newShow = {
            id,
            name,
            imageUrl,
          };

          printCard(newShow);

          // criei a função Save results para aramazenar os valores de newShow em um array
          function saveResults(newShow) {
            const existingShows =
              JSON.parse(localStorage.getItem("searchResults")) || [];
            existingShows.push(newShow);
            localStorage.setItem(
              "searchResults",
              JSON.stringify(existingShows)
            );
          }

          saveResults(newShow);
        });
      })
    );
  }
};

const abaFavoriteShows = (event) =>{
  event.preventDefault();

 window.location.href="favoritos.html"
}

function favoriteShow(showFav) {
  const favoritingShows = JSON.parse(localStorage.getItem("showsFavoritos")) || [];
    const index = favoritingShows.indexOf(showFav)

    if (index === -1){
      favoritingShows.push(showFav)
    } 
    else{
      favoritingShows.splice(index, 1)
    }

    const starImage = document.querySelector(`.star-${showFav}`)

    if (starImage.src.endsWith("empty_star.png")){
      starImage.src="./img/yellow_star.png"
    } 
    else if(starImage.src.endsWith("yellow_star.png")){
      starImage.src="./img/empty_star.png"
    }
    localStorage.setItem("showsFavoritos", JSON.stringify(favoritingShows))
}
const favoritados =(id)=>{
  const favoritingShows =JSON.parse(localStorage.getItem("showsFavoritos")) || []
  return favoritingShows.includes(id)
}


//pensar em outra maneira de trocar a imagem

const printCard = (show) => {
  const posterId = `poster-${show.id}`;
  const titleId = `title-${show.id}`;

  const showCard = `
        <div class="show-card">

          <a href="/details.html?id=${show.id}">
            <img id="${posterId}" src="${show.imageUrl}" alt="${show.name}">
          </a>

          <a href="/details.html?id=${show.id}">
            <h3 id="${titleId}">${show.name}</h3>
          </a>


        <div id="areaBotao">
          <button" onclick="favoriteShow(${show.id})">
		  	<img id="favoritar-botao" class="star-${show.id}" src="${
   favoritados(show.id) ? "img/yellow_star.png" : "img/empty_star.png"
  }" />
		  </button>
      </div>
    </div>

        </div>
  `;

  const showsArea = $("shows-area");
  showsArea.insertAdjacentHTML("beforeend", showCard);
};



const showsOnLocalFavoritos = localStorage.getItem("showsFavoritos");
const arrayShowsFavoritos = JSON.parse(showsOnLocalFavoritos) || [];

//aqui eu puxo as informações do local storage e mando printar
const showsOnLocal = localStorage.getItem("searchResults");
const arrayShows = JSON.parse(showsOnLocal);

if (arrayShows && arrayShows.length > 0) {
  arrayShows.forEach((show) => {
    printCard(show);
  });
}
