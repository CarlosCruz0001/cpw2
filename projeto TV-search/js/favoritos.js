const $ = document.getElementById.bind(document)
const API_URL = 'https://api.tvmaze.com/shows'

window.onload = () => {
	const favorites = JSON.parse(localStorage.getItem('showsFavoritos')) || []

    $("sem-shows-favoritos").style.display = "none";

    if (favorites<1) {
        $("sem-shows-favoritos").style.display = "block"
    }


	favorites.forEach(id => {
		fetch(`${API_URL}/${id}`).then(response => {
			response.json().then(result => {

				const { id, name, image } = result

				const imageUrl = image ? image.medium : '/img/noimage.png'

				const newShow = {
					id,
					name,
					imageUrl
				}

				printCard(newShow)
			})
		})
	})
}

const printCard = show => {
	const posterId = `poster-${show.id}`
	const titleId = `title-${show.id}`

	const showCard = `
        <div class="show-card">
          
            <img id="${posterId}" src="${show.imageUrl}" alt="${show.name}">
          
            <h3 id="${titleId}">${show.name}</h3>

          </div>
    `

	const showsArea = $('shows-area')
	showsArea.insertAdjacentHTML('beforeend', showCard)
}

