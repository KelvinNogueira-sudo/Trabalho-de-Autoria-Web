import { getCafes } from "./api.js";
import {
  addItem,
  removeItem,
  getCart,
  getTotalItens,
  getTotalPrice,
  cleanCart,
} from "./cart.js";

//TESTE DE API
const root = document.getElementById("root");

async function renderHome() {
  root.textContent = "Carregando cafés...";

  try {
    const cafes = await getCafes();
    root.textContent = "";
    // aqui entram os cards dos cafés
  } catch (error) {
    root.textContent = "";

    const alerta = document.createElement("div");
    alerta.className = "alert alert-danger m-4";
    alerta.textContent = error.message;

    root.appendChild(alerta);
  }
}

//TESTE CARRINHO
cleanCart();

const black = { id: 1, title: "Black Coffee", price: 3.0 };
const latte = { id: 2, title: "Latte", price: 4.5 };

addItem(black);
addItem(black);
addItem(latte);
console.log("1) Carrinho:", getCart());
// Black Coffee x2, Latte x1
console.log("2) Total de itens:", getTotalItens()); // 3
console.log("3) Total em R$:", getTotalPrice()); // 10.5

removeItem(1);
console.log("4) Após remover 1 Black:", getCart());
// Black Coffee x1, Latte x1

removeItem(1);
console.log("5) Black removido de vez:", getCart());
// só Latte x1

removeItem(999);
console.log("6) Remover id inexistente (não deve quebrar):", getCart());

cleanCart();
console.log("7) Após limpar:", getCart()); // []

renderHome();
