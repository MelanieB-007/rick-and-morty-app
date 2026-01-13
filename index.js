import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { createSearchBar } from "./components/SearchBar/SearchBar.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

/*
const state {
page: 1;
searchQuery: "";
maxPage: 1;
}
*/

async function fetchData() {
  const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  // maxPage = data.info.pages; // State wird hier aktualisiert = Für die aktuelle Suche gibt es X-Seiten, wenn ich neu fetche, wird es neu gesetzt
  cardContainer.innerHTML = ""; // Löscht alte Karten aus dem DOM, zeigt mir die gesuchten Karten an

  return data.results;
}

async function renderCharacters() {
  const results = await fetchData();

  results.forEach((result) => {
    cardContainer.append(createCharacterCard(result));
  });
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

renderCharacters();
