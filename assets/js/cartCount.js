// assets/js/cartCount.js
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartCountElem = document.getElementById("cart-count");
  if (cartCountElem) {
    cartCountElem.textContent = total;
    cartCountElem.style.display = total > 0 ? "inline-block" : "none";
  }
}

// Khi trang load xong thì cập nhật số lượng
document.addEventListener("DOMContentLoaded", updateCartCount);
