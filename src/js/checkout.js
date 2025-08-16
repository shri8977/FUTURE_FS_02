const checkoutList = document.getElementById("checkout-list");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");
const orderSuccess = document.getElementById("order-success");
const orderIdSpan = document.getElementById("order-id");

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function renderCheckout() {
  let cart = getCart();
  checkoutList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    checkoutList.innerHTML = `<p class="text-gray-500">🛒 Your cart is empty.</p>`;
    checkoutTotal.textContent = "0";
    return;
  }

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "flex justify-between items-center border-b pb-2";

    div.innerHTML = `
      <div>
        <h3 class="font-semibold">${item.name}</h3>
        <p class="text-gray-500">x${item.quantity}</p>
      </div>
      <p class="font-bold text-green-600">₹${item.price * item.quantity}</p>
    `;

    checkoutList.appendChild(div);
  });

  checkoutTotal.textContent = total;
}

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const cart = getCart();
  if (cart.length === 0) {
    alert("🛒 Your cart is empty!");
    return;
  }
  localStorage.removeItem("cart");
  const orderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);
  orderIdSpan.textContent = orderId;
  orderSuccess.classList.remove("hidden");
  checkoutForm.classList.add("hidden");
});
document.addEventListener("DOMContentLoaded", renderCheckout);
