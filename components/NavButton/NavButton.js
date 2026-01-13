export function createNavButton(buttonText, buttonClass, dataJS) {
    const button = document.createElement("button");
    const classList = ["button", buttonClass];
    button.classList.add(...classList);
    button.dataset.js = dataJS;
    button.innerHTML = buttonText;

    return button;
}
