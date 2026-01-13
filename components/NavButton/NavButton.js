// gehört zu index.js
/*
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
*/

/*
export function createNavButton(dataJs, buttonClass, name) {
  const button = document.createElement("navigation");
  navigation.innerHTML = `<button class="button ${buttonClass}" data-js="${dataJs}">
        ${name}
      </button>`; // doppelter button?!
  return button;
}
  */

export function createNavButton(dataJs, buttonClass, name) {
  //erstelle einen leeren Button
  const button = document.createElement("button"); // <button></button>
  button.className = `button ${buttonClass}`; // <button class="button button--prev"></button
  button.setAttribute("data-js", dataJs); // <button class="button button--prev" data-js="button-prev"></button>
  button.textContent = name;
  return button;
}
/*
prevButton.addEventListener("click", () => {
  page = page > 1 ? page - 1 : 1;
  fetchCharacters();
});

nextButton.addEventListener("click", () => {
  page = page < maxPage ? page + 1 : maxPage;
  fetchCharacters();
});
*/
