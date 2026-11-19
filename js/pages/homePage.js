import { createElement } from "../dom.js";
import { getCafes } from "../api.js";
import { addItem } from "../cart.js";

// Formata o preço do café no localStorage de String para value
function formatPrice(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Cria o card do café e seus atributos (Imagem, descrição, ingredientes, etc)
function createCard(cafe) {
    const column = createElement("div", "col-12 col-md-6 col-lg-4");    // Cria as colunas onde vão ficar os cards
    const card = createElement("div", "card h-100 shadow-sm");          // Cria o elemento card
    const body = createElement("div", "card-body d-flex flex-column");  // Cria o corpo do card

    const img = createElement("img", "card-img");                   // Cria o elemento da imagem e seus atributos
    img.src = cafe.image;
    img.alt = cafe.title;
    img.style.height = "300px";
    img.style.objectFit = "cover";

    const title = createElement("h5", "card-title", cafe.title);    // Titulo do café
    const description = createElement(
        "p",
        "card-text text-muted",
        cafe.description,
    ); // Descrição do café

    const ingredients = createElement("div", "mb-3");               // Ingredientes do café (com loop que busca e exibe os ingredientes)
    cafe.ingredients.forEach((ingredient) => {
        ingredients.append(
            createElement("span", "badge text-bg-secondary me-1", ingredient),
        );
    });

    const footer = createElement("div", "mt-auto d-flex justify-content-between align-itens-center");   // Rodapé do card com preço e botão de adicionar ao carrinho
    const price = createElement("span", "fs-5 fw-bold", formatPrice(cafe.price));                       // Preço
    const button = createElement("button", "btn btn-primary", "Adicionar no Carrinho 🛒");              // Botão de adicionar ao carrinho
    button.addEventListener("click", () => addItem(cafe));                                              // Ao clicar, adiciona o café no carrinho

    // Montagem do card
    footer.append(price, button);
    body.append(title, description, ingredients, footer);
    card.append(img, body);
    column.append(card);

    return column;
}

// Mensagem de erro caso os cards não forem carregados
function errorMessage(message, onRetry) {
    const alert = createElement("div", "alert");        // Cria um botão de Alerta
    alert.setAttribute("role", "alert");

    const text = createElement("p", "mb-2", message);
    const retry = createElement("button", "btn btn-outline-danger", "Tente Recarregar Novamente");
    retry.addEventListener("click", onRetry);           // Ao clicar, recarrega a página

    alert.append(text, retry);
    return alert;
}

// Renderiza e carrega a pagina principal
export async function renderHome(container) {
    container.append(createElement("h2", "mb-4", "Seleção de Cafés ☕"));
    container.append(createElement("h5", "", "Os melhores cafés da sua região"));

    const content = createElement("div");
    container.append(content);

    async function loadCafes() {
        try {
            const cafes = await getCafes();

            const row = createElement("div", "row g-4");
            cafes.forEach((cafe) => row.append(createCard(cafe)));

            content.replaceChildren(row);
        } catch (error) {
            content.replaceChildren(errorMessage(error.message, loadCafes));
        }
    }

    await loadCafes();
}
