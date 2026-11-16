import { getCafes } from "./api.js";

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

renderHome();