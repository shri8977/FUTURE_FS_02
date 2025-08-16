const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const row = document.createElement("div");
    row.className = "flex justify-between items-center border-b py-4";

    row.innerHTML = `
      <div>
        <h3 class="font-semibold text-lg">${item.name}</h3>
        <p class="text-sm text-gray-500">${item.weight}</p>
        <p class="text-green-600 font-bold">₹${item.price}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" onclick="decreaseQty(${index})">-</button>
        <span class="px-3">${item.quantity}</span>
        <button class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" onclick="increaseQty(${index})">+</button>
        <button class="ml-3 text-red-600 hover:text-red-800" onclick="removeItem(${index})">🗑️</button>
      </div>
    `;
    cartItemsContainer.appendChild(row);
  });

  cartTotal.textContent = total;
  updateCartCount();
}

function increaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  showToast("Quantity increased ✅");
}

function decreaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  showToast("Item removed ❌", "error");
}

renderCart();
