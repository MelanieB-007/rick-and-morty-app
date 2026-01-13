export function createNavPagination(dataJS, currentPage, maxPage) {
    const spanPagination = document.createElement("span");
    const classList = ["navigation__pagination"];
    spanPagination.classList.add(...classList);
    spanPagination.dataset.js = dataJS;
    spanPagination.innerHTML = `${currentPage}/${maxPage}`;

    return spanPagination;
}
