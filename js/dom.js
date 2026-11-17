// Função utilitária usada para criar novos elementos e evitar
//  estar repitindo essas 4 linhas todo vez que criar um elemento

export function createElement(tag, className = "", text = "") {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}