import { createElement } from "./dom.js";
import { createHeader } from "./header.js";
import { registerRouter, startRouter } from "./router.js";
import { renderHome } from "./pages/homePage.js";
import { renderCart } from "./pages/cartPage.js";
import { renderCheckout } from "./pages/checkoutPage.js";

const root = document.getElementById("root");
const main = createElement("main", "container py-4");

root.append(createHeader(), main);

registerRouter("/", renderHome);
registerRouter("/carrinho", renderCart);
registerRouter("/finalizar", renderCheckout);

startRouter(main);