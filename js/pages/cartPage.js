import { createElement } from "../dom.js";

export async function renderCart(container) {
    container.append(createElement("h2", "", "Carrinho"));
}