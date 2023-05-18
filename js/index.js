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

const favoriteShows = (event) =>{
  event.preventDefault();

 window.location.href="favoritos.html"
}

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

          <button id="favorite-button" onclick="favoriteShow(event)" data-show-id="${show.id}">
          <img src="/img/yellow_star.png" alt="Favoritar">
        </button>
    </div>

        </div>
  `;

  const showsArea = $("shows-area");
  showsArea.insertAdjacentHTML("beforeend", showCard);
};

function favoriteShow(event) {
  const showId = event.target.getAttribute("data-show-id");

  const favoritingShows =
    JSON.parse(localStorage.getItem("showsFavoritos")) || [];
  
    favoritingShows.push(showId);
    localStorage.setItem("showsFavoritos", JSON.stringify(favoritingShows));
    console.log("Show favorited:", showId);
}

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
