const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

export function createNavButton(dataJs, buttonClass, name) {
  const button = document.createElement("button");
  button.innerHTML = `<button class="button ${buttonClass}" data-js="${dataJs}">
        ${name}
      </button>`;
  return button;
}

prevButton.addEventlistener("click", () => {
  page = currentPage - 1;
});

nextButton.addEventlistener("click", () => {
  page = currentPage + 1;
});
