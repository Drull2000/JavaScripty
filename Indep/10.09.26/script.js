const apiKey = 'thewdb';
const searchForm = document.getElementById('searchForm');
const titleInput = document.getElementById('title');
const typeInput = document.getElementById('type');
const message = document.getElementById('message');
const films = document.getElementById('films');
const pagination = document.getElementById('pagination');
const details = document.getElementById('details');

let currentTitle = '';
let currentType = 'movie';
let currentPage = 1;
let totalPages = 0;

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    currentTitle = titleInput.value.trim();
    currentType = typeInput.value;
    currentPage = 1;
    details.innerHTML = '';

    if (currentTitle === '') {
        showError('Введите название фильма');
        return;
    }

    searchFilms(currentPage);
});

async function searchFilms(page) {
    setLoading(true);
    showMessage('Завантаження...');
    films.innerHTML = '';
    pagination.innerHTML = '';

    try {
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(currentTitle)}&type=${currentType}&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || data.Response === 'False') {
            throw new Error(data.Error || 'Фильмы не найдены');
        }

        currentPage = page;
        totalPages = Math.ceil(Number(data.totalResults) / 10);
        renderFilms(data.Search);
        renderPagination();
        showMessage('');
    } catch (error) {
        films.innerHTML = '';
        pagination.innerHTML = '';
        showError(error.message === 'Фильмы не найдены' ? 'Movie not found' : error.message);
    } finally {
        setLoading(false);
    }
}

function renderFilms(items) {
    films.innerHTML = items.map((film) => {
        const poster = film.Poster !== 'N/A' ? film.Poster : '';

        return `
            <article class="film-card">
                <img src="${poster}" alt="${film.Title}">
                <div>
                    <small>${film.Type}</small>
                    <h3>${film.Title}</h3>
                    <p>${film.Year}</p>
                    <button class="details-button" data-id="${film.imdbID}">Details</button>
                </div>
            </article>
        `;
    }).join('');

    document.querySelectorAll('.details-button').forEach((button) => {
        button.addEventListener('click', () => showDetails(button.dataset.id));
    });
}

function renderPagination() {
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

    addPageButton('<<', 1, currentPage === 1);
    addPageButton('<', currentPage - 1, currentPage === 1);

    const firstPage = Math.max(1, Math.min(currentPage - 2, totalPages - 5));
    const lastPage = Math.min(totalPages, firstPage + 5);

    for (let page = firstPage; page <= lastPage; page++) {
        addPageButton(page, page, false, page === currentPage);
    }

    addPageButton('>', currentPage + 1, currentPage === totalPages);
    addPageButton('>>', totalPages, currentPage === totalPages);
}

function addPageButton(text, page, disabled, active = false) {
    const button = document.createElement('button');
    button.textContent = text;
    button.disabled = disabled;

    if (active) {
        button.className = 'active';
    }

    button.addEventListener('click', () => searchFilms(page));
    pagination.appendChild(button);
}

async function showDetails(id) {
    details.textContent = 'Загрузка информации...';

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`);
        const film = await response.json();

        if (!response.ok || film.Response === 'False') {
            throw new Error(film.Error || 'Информация не найдена');
        }

        const poster = film.Poster !== 'N/A' ? film.Poster : '';
        details.innerHTML = `
            <div class="details-box">
                <img src="${poster}" alt="${film.Title}">
                <div>
                    <h2>Film info:</h2>
                    <p><strong>Title:</strong> ${film.Title}</p>
                    <p><strong>Released:</strong> ${film.Released}</p>
                    <p><strong>Genre:</strong> ${film.Genre}</p>
                    <p><strong>Country:</strong> ${film.Country}</p>
                    <p><strong>Director:</strong> ${film.Director}</p>
                    <p><strong>Writer:</strong> ${film.Writer}</p>
                    <p><strong>Actors:</strong> ${film.Actors}</p>
                    <p><strong>Awards:</strong> ${film.Awards}</p>
                </div>
            </div>
        `;
    } catch (error) {
        details.innerHTML = `<p class="message error">${error.message}</p>`;
    }
}

function setLoading(isLoading) {
    searchForm.querySelector('button').disabled = isLoading;
}

function showMessage(text) {
    message.className = 'message';
    message.textContent = text;
}

function showError(text) {
    message.className = 'message error';
    message.textContent = text;
}
