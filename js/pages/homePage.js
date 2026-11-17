import { createElement } from "../dom.js";
import { addItem } from "../cart.js";

export function renderHome(container) {
    container.append(createElement("h2", "", "Página Inicial"));

    const button = createElement("button", "btn btn-success mt-3", "Adicionar item ao carrinho");
    button.addEventListener("click", () => {
        addItem({id: 1, title: "Café Preto", price: 2.5});
    });

    container.append(button);
}