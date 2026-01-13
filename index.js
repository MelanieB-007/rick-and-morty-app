import {createCharacterCard} from "./components/CharacterCard/CharacterCard.js";
import {createNavButton} from "./components/NavButton/NavButton.js";
import {createNavPagination} from "./components/NavPagination/NavPagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
//const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
//const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let page = 1;
//let searchQuery = "";

async function fetchCharacters() {
    const url = `https://rickandmortyapi.com/api/character?page=${page}`;

    const response = await fetch(url);
    const data = await response.json();

    cardContainer.innerHTML = '';

    renderCharacters(data.results);
    renderPagination(data.info);

    return data;

}


async function renderCharacters(results) {
    results.forEach((result) => {
        cardContainer.append(createCharacterCard(result));
    });
}

async function renderPagination(info){
    const prevButton = createNavButton("previous", "button--prev", "button-prev");
    navigation.append(prevButton);

    const pagination = createNavPagination("pagination", page, info.pages);
    navigation.append(pagination);

    const nextButton = createNavButton("next", "button--next", "button-next");
    navigation.append(nextButton);
}

fetchCharacters();
