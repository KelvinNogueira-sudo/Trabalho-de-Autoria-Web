import { createElement } from "../dom.js";

export async function renderCheckout(container) {
    container.append(createElement("h2", "", "Finalizar Compra"));
}