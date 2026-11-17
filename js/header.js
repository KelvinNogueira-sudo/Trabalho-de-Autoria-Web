import { getTotalItens } from "./cart.js";
import { createElement } from "./dom.js";

// Atualiza o contador do carrinho sempre que ele mudar
export function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (badge) badge.textContent = getTotalItens();
}

// Cria um header
export function createHeader() {
    const nav = createElement("nav", "navbar navbar-dark bg-dark px-3 sticky-top");     // Cria uma barra de navegação

    const brand = createElement("a", "navbar-brand", "Coffee Shop");                    // Logo do site
    brand.href = "#/";

    const cartLink = createElement("a", "btn btn-outline-light");                       // Cria um botão pro carrinho
    cartLink.href = "#/carrinho";
    cartLink.setAttribute("arial-label", "Acessar Carrinho");
    cartLink.append("🛒");

    nav.append(brand, cartLink);

    window.addEventListener("cartchange", updateCartBadge);                             // Capta o evento que indica que a quantidade de produtos no carrinho mudou

    return nav;
}