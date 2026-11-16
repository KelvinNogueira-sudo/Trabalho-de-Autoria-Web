// Formato escolhido para salvar os items:
// [{id: number, title: string, price: number, quantity: number}]

// Chave usada no localStorage
const CART_KEY = "cart";

// Lê e retorna os itens no carrinho
export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) ?? [];
  } catch {
    return [];
  }
}

// Salva os items no carrinho
export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Adiciona um item no carrinho
export function addItem(cafe) {
  const cart = getCart();                                       // Pega os itens do carrinho
  const existing = cart.find((item) => item.id === cafe.id);    // Checa se o item já está no carrinho

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({                                                 // Senão, adiciona ele ao carrinho
      id: cafe.id,
      title: cafe.title,
      price: cafe.price,
      quantity: 1,
    });
  }

  saveCart(cart);
}

// Remove item do carrinho
export function removeItem(id) {
  let cart = getCart();
  const existing = cart.find((item) => item.id === id);

  if (!existing) return;                                    // Se não achar, retorna

  if (existing.quantity > 1) {
    existing.quantity -= 1;                                 // Se tiver mais de 1 item, remove 1
  } else {
    cart = cart.filter((item) => item.id !== id);           // Senão, retira do carrinho
  }

  saveCart(cart);
}

// Retorna o total de itens
export function getTotalItens() {
    return getCart().reduce((total, item) => total + item.quantity, 0);
}

// Retorna o valor total
export function getTotalPrice() {
    return getCart().reduce((total, item) => total + item.price * item.quantity, 0);
}

// Limpa o carrinho
export function cleanCart() {
    localStorage.removeItem(CART_KEY);
}