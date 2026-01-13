import {createCharacterCard} from "./components/CharacterCard/CharacterCard.js";
import {createNavButton} from "./components/NavButton/NavButton.js";
import {createNavPagination} from "./components/NavPagination/NavPagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
//const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
//const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
let prevButton = document.querySelector('[data-js="button-prev"]');
let nextButton = document.querySelector('[data-js="button-next"]');
let pagination = document.querySelector('[data-js="pagination"]');

// States
let page = 1;
let maxPage = 1;
let nextUrl = null;
let prevUrl = null;
const url = `https://rickandmortyapi.com/api/character?page=${page}`;

//let searchQuery = "";

function initNavigation(){
    prevButton = createNavButton("previous", "button--prev", "button-prev");
    pagination = createNavPagination("pagination", page, maxPage);
    nextButton = createNavButton("next", "button--next", "button-next");

    prevButton.addEventListener('click', handlePrevButton);
    nextButton.addEventListener('click', handleNextButton);

    navigation.append(prevButton, pagination, nextButton);
}

async function fetchCharacters(url) {
    const response = await fetch(url);
    const data = await response.json();

    nextUrl = data.info.next;
    prevUrl = data.info.prev;
    maxPage = data.info.pages;
    cardContainer.innerHTML = '';

    renderCharacters(data.results);
    renderPagination();

    return data;
}


async function renderCharacters(results) {
    results.forEach((result) => {
        cardContainer.append(createCharacterCard(result));
    });
}

async function renderPagination(){
    pagination.textContent = `${page}/${maxPage}`;
    prevButton.disabled = !prevUrl;
    nextButton.disabled = !nextUrl;
}

function handlePrevButton(){
    if(prevUrl){
        fetchCharacters(prevUrl);
    }
}

function handleNextButton(){
    if(nextUrl){
        fetchCharacters(nextUrl);
    }
}

initNavigation();
fetchCharacters(url);
