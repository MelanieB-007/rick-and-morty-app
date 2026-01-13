import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { createNavButton } from "./components/NavButton/NavButton.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

async function fetchData() {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();

  return data;
}

async function renderCharacters() {
  results.results.forEach((result) => {
    cardContainer.append(createCharacterCard(result));
  });
}

async function renderButton(dataJs, buttonClass, name) {
  navigation.append(createNavButton(dataJs, buttonClass, name));
}

const results = await fetchData();
renderCharacters();
/*
renderButton("button-prev", "button--prev", "prev");

renderButton("button-next", "button--next", "next");
*/

const prevButton = createNavButton("button-prev", "button--prev", "prev");
const nextButton = createNavButton("button-next", "button--next", "next");

navigation.append(prevButton);
navigation.append(nextButton);

prevButton.addEventListener("click", () => {
  page = page > 1 ? page - 1 : 1;
  fetchCharacters();
});

nextButton.addEventListener("click", () => {
  page = page < maxPage ? page + 1 : maxPage;
  fetchCharacters();
});
