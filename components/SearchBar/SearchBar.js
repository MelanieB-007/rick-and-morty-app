// ich biete diese Funktion an und im index.js über import: ich kaufe diese Funktion
export function createSearchBar(onSubmit) {
  const form = document.createElement("form"); //form und nicht div, wegen screenreader, seo und browserlesbarkeit

  // wir schreiben HTML als String, und es wir in echtes HTML umgewandelt
  form.innerHTML = `<input
            name="query"
            class="search-bar__input"
            type="text"
            placeholder="search characters"
            aria-label="character name"
          />
          <button class="search-bar__button" aria-label="search for character">
            <img
              class="search-bar__icon"
              src="assets/magnifying-glass.png"
              alt=""
            />
          </button>`;
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // nein, Seite nicht neu laden, mein JS-State soll bleiben.
    const input = form.querySelector("input"); // Hole mir das Input aus der SearchBar,
    onSubmit(input.value); // Callback aufrufen: übergebe den Input z.B. Rick als Parameter + ändern von searchQuery = input.value, weil SearchBar keinen State kennt
    return form;
  });
}

// baut DOM, hört Event, ruft Callback, gibt DOM zurück
