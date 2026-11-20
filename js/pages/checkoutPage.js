import { createElement } from "../dom.js";
import { getCart, getTotalPrice, cleanCart } from "../cart.js";

// Formata o preço para o padrão brasileiro (R$ 0,00)
function formatPrice(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Tamanho mínimo aceito para o endereço
const MIN_ADDRESS_LENGTH = 10;

// Mensagem para quem chega na finalização com o carrinho vazio
function createEmptyMessage() {
    const box = createElement("div", "alert alert-secondary text-center");
    const text = createElement("p", "mb-3", "Não há itens para finalizar.");
    const link = createElement("a", "btn btn-primary", "Voltar para a loja");
    link.href = "#/";

    box.append(text, link);
    return box;
}

// Resumo dos itens e do total
function createSummary(cart) {
    const summary = createElement("div", "mb-4");
    const list = createElement("ul", "list-group mb-3");

    cart.forEach((item) => {
        const row = createElement("li", "list-group-item d-flex justify-content-between");
        row.append(
            createElement("span", "", `${item.quantity}x ${item.title}`),
            createElement("span", "", formatPrice(item.price * item.quantity)),
        );
        list.append(row);
    });

    summary.append(list, createElement("h4", "text-end", `Total: ${formatPrice(getTotalPrice())}`));
    return summary;
}

// Tela mostrada depois que a compra é finalizada
function createConfirmation() {
    const box = createElement("div", "alert alert-success text-center");
    box.setAttribute("role", "alert");

    const title = createElement("h4", "alert-heading", "Compra finalizada com sucesso! 🎉");
    const text = createElement("p", "mb-3", "Obrigado por comprar na Caffeine Lovers. Seu pedido já está sendo preparado.");
    const link = createElement("a", "btn btn-primary", "Voltar para a página inicial");
    link.href = "#/";

    box.append(title, text, link);
    return box;
}

// Cria o formulário de endereço e pagamento
function createForm(onSuccess) {
    const form = createElement("form", "mb-4");
    form.noValidate = true;

    // Campo de endereço
    const addressGroup = createElement("div", "mb-3");
    const addressLabel = createElement("label", "form-label", "Endereço de entrega");
    addressLabel.htmlFor = "address";
    const address = createElement("input", "form-control");
    address.id = "address";
    address.type = "text";
    address.placeholder = "Rua, número, bairro, cidade";
    const addressError = createElement("div", "invalid-feedback", `Informe um endereço com pelo menos ${MIN_ADDRESS_LENGTH} caracteres.`);
    addressGroup.append(addressLabel, address, addressError);

    // Campo de método de pagamento
    const paymentGroup = createElement("div", "mb-3");
    const paymentLabel = createElement("label", "form-label", "Método de pagamento");
    paymentLabel.htmlFor = "payment";
    const payment = createElement("select", "form-select");
    payment.id = "payment";
    [
        ["", "Selecione..."],
        ["credito", "Cartão de crédito"],
        ["boleto", "Boleto"],
        ["pix", "PIX"],
    ].forEach(([value, label]) => {
        const option = createElement("option", "", label);
        option.value = value;
        payment.append(option);
    });
    const paymentError = createElement("div", "invalid-feedback", "Selecione um método de pagamento.");
    paymentGroup.append(paymentLabel, payment, paymentError);

    const submit = createElement("button", "btn btn-success btn-lg", "Finalizar");
    submit.type = "submit";

    form.append(addressGroup, paymentGroup, submit);

    // Validação ao enviar
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const addressValid = address.value.trim().length >= MIN_ADDRESS_LENGTH;
        const paymentValid = payment.value !== "";

        address.classList.toggle("is-invalid", !addressValid);
        payment.classList.toggle("is-invalid", !paymentValid);

        if (addressValid && paymentValid) onSuccess();
    });

    return form;
}

// Renderiza a página de finalização
export async function renderCheckout(container) {
    container.append(createElement("h2", "mb-4", "Finalizar Compra"));

    const cart = getCart();

    if (cart.length === 0) {
        container.append(createEmptyMessage());
        return;
    }

    const content = createElement("div");
    content.append(
        createSummary(cart),
        createForm(() => {
            cleanCart();                                    // Zera o carrinho e atualiza o contador do cabeçalho
            content.replaceChildren(createConfirmation());  // Mostra a mensagem de confirmação
        }),
    );

    container.append(content);
}
