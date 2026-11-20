import { createElement } from "../dom.js";
import { getCart, addItem, removeItem, getTotalPrice } from "../cart.js";
import { navigate } from "../router.js";

// Formata o preço para o padrão brasileiro (R$ 0,00)
function formatPrice(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Mensagem exibida quando o carrinho está vazio
function createEmptyMessage() {
    const box = createElement("div", "alert alert-secondary text-center");
    const text = createElement("p", "mb-3", "Seu carrinho está vazio ☕");
    const link = createElement("a", "btn btn-primary", "Voltar para a loja");
    link.href = "#/";

    box.append(text, link);
    return box;
}

// Cria uma linha da lista com nome, preço, quantidade e botões + e −
function createCartItem(item, onChange) {
    const row = createElement("li", "list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2");

    const info = createElement("div");
    info.append(
        createElement("h5", "mb-1", item.title),
        createElement("small", "text-muted", `${formatPrice(item.price)} cada`),
    );

    const controls = createElement("div", "d-flex align-items-center gap-2");

    const minus = createElement("button", "btn btn-outline-secondary btn-sm", "−");     // Remove 1 unidade
    minus.setAttribute("aria-label", `Remover uma unidade de ${item.title}`);
    minus.addEventListener("click", () => {
        removeItem(item.id);
        onChange();
    });

    const quantity = createElement("span", "fw-bold px-2", String(item.quantity));       // Quantidade atual

    const plus = createElement("button", "btn btn-outline-secondary btn-sm", "+");       // Adiciona 1 unidade
    plus.setAttribute("aria-label", `Adicionar uma unidade de ${item.title}`);
    plus.addEventListener("click", () => {
        addItem(item);
        onChange();
    });

    const subtotal = createElement("span", "fw-bold ms-3", formatPrice(item.price * item.quantity));

    controls.append(minus, quantity, plus, subtotal);
    row.append(info, controls);
    return row;
}

// Renderiza a página do carrinho
export async function renderCart(container) {
    container.append(createElement("h2", "mb-4", "Carrinho 🛒"));

    const content = createElement("div");
    container.append(content);

    // Redesenha a lista, o total e o botão sempre que o carrinho mudar
    function draw() {
        const cart = getCart();

        if (cart.length === 0) {
            content.replaceChildren(createEmptyMessage());
            return;
        }

        const list = createElement("ul", "list-group mb-4");
        cart.forEach((item) => list.append(createCartItem(item, draw)));

        const footer = createElement("div", "d-flex flex-wrap justify-content-between align-items-center gap-3");
        const total = createElement("h4", "mb-0", `Total: ${formatPrice(getTotalPrice())}`);

        const checkout = createElement("button", "btn btn-success btn-lg", "Finalizar Compra");
        checkout.addEventListener("click", () => navigate("/finalizar"));

        footer.append(total, checkout);
        content.replaceChildren(list, footer);
    }

    draw();
}