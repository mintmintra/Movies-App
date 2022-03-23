const apiKey = "";
let years = "2021";
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&year=${years}&with_watch_monetization_types=flatrate`;

const content = document.getElementById('content');
const urlPoster = `https://image.tmdb.org/t/p/w500/`;

const dropdown = document.getElementById('years');


async function displayMovies(url) {
    const response = await fetch(url);
    const movies = await response.json();

    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    movies.results.forEach(data => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        const title = document.createElement('h2');
        const poster = document.createElement('img');
        title.innerHTML = `${data.title.substring(0,24)}`;
        poster.src = `${urlPoster}${data.poster_path}`;
        movieEl.appendChild(title);
        movieEl.appendChild(poster);
        content.appendChild(movieEl);
    });
}

dropdown.addEventListener('change', () => {
    years = dropdown.value;
    const updateUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&year=${years}&with_watch_monetization_types=flatrate`;
    displayMovies(updateUrl);
});

displayMovies(url);