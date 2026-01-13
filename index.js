import {createCharacterCard} from "./components/CharacterCard/CharacterCard.js";
import {createNavButton} from "./components/NavButton/NavButton.js";
import {createNavPagination} from "./components/NavPagination/NavPagination.js";
import { createSearchBar } from "./components/SearchBar/SearchBar.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');


// States
let page = 1;
let maxPage = 1;
let nextUrl = null;
let prevUrl = null;
let prevButton;
let nextButton;
let pagination;
let searchQuery = "";
const url = `https://rickandmortyapi.com/api/character?page=${page}`;

initNavigation();
fetchCharacters(url);

//let searchQuery = "";

function initNavigation(){
    prevButton = createNavButton("previous", "button--prev", "button-prev");
    pagination = createNavPagination();
    nextButton = createNavButton("next", "button--next", "button-next");

    prevButton.addEventListener('click', handlePrevButton);
    nextButton.addEventListener('click', handleNextButton);

    navigation.append(prevButton, pagination, nextButton);
}


function getPageFromUrl(urlString){
    const url = new URL(urlString);
    return parseInt(url.searchParams.get('page')) || 1;
}

async function fetchCharacters(url) {
    const response = await fetch(url);
    const data = await response.json();

    setStates(url, data.info);
    renderCharacters(data.results);
    renderPagination();
}

async function setStates(url, info){
    page = getPageFromUrl(url);
    nextUrl = info.next;
    prevUrl = info.prev;
    maxPage = info.pages;
}

async function renderCharacters(results) {
    cardContainer.innerHTML = '';

    results.forEach((result) => {
        cardContainer.append(createCharacterCard(result));
    });
}

function renderPagination(){
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

// Ich baue eine SearchBar. Und WENN dort gesucht wird, dann führe diese Funktion aus. Dabei ist "query" = onSubmit CallbackFunktion in der SearchBar JS
const searchBar = createSearchBar((query) => {
    searchQuery = query;
    page = 1;
    renderCharacters();
});

searchBarContainer.append(searchBar);
/*
searchBar.addEventListener("submit", (event) => {
  event.preventDefault(); // nein, Seite nicht neu laden, mein JS-State soll bleiben.
  const input = searchBar.querySelector("input"); // Hole mir das Input aus der SearchBar,
  searchQuery = input.value; // Nimm den Text, den der User eingegeben hat und speicher ihn im State
  page = 1; // eine neue Seite soll immer auf Seite 1 starten
  renderCharacters(); // muss drinnen steht, läuft nur wenn User sucht.
});
*/
