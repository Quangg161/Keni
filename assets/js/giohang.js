let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartBody = document.getElementById("cart-body");
const totalPriceEl = document.getElementById("total-price");

// Lấy thông tin sản phẩm theo ID
function getProductById(id) {
  return products.find(p => p.id === id);
}

// Lưu giỏ hàng vào localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Cập nhật số lượng trong biểu tượng giỏ hàng
function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  countEl.textContent = totalQty;
}

// Render toàn bộ giỏ hàng
function renderCart() {
  cartBody.innerHTML = "";

  if (cart.length === 0) {
    cartBody.innerHTML = `<tr><td colspan="5" class="text-center">Giỏ hàng trống.</td></tr>`;
    totalPriceEl.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const product = getProductById(item.id);
    if (!product) return;

    const originalPrice = product.price;
    const finalPrice = product.discount > 0
      ? Math.round(originalPrice * (100 - product.discount) / 100)
      : originalPrice;

    const quantity = item.quantity || 1;
    const itemTotal = finalPrice * quantity;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="checkbox" class="product-check" checked data-index="${index}"></td>
      <td class="text-start d-flex align-items-center">
        <img class="img-thumbnail" src="${product.image}" style="width:120px;height:auto;">
        <div class="ms-3">
          <strong>${product.name}</strong><br>
          <small>Thương hiệu: ${product.brand}</small><br>
          <small>Size: ${item.size || 'Chưa chọn'}</small>
        </div>
      </td>
      <td>
        ${product.discount > 0
          ? `<span class="text-danger fw-bold">${finalPrice.toLocaleString()}đ</span>
             <br><small class="text-muted text-decoration-line-through">${originalPrice.toLocaleString()}đ</small>`
          : `<span class="product-price">${originalPrice.toLocaleString()}đ</span>`}
      </td>
      <td>
        <div class="input-group input-group-sm">
          <button class="btn btn-outline-secondary btn-minus">-</button>
          <input class="form-control text-center quantity" style="width:50px;" type="text" value="${quantity}">
          <button class="btn btn-outline-secondary btn-plus">+</button>
        </div>
      </td>
      <td><button class="btn btn-outline-danger btn-delete"><i class="fas fa-trash"></i></button></td>
    `;

    // Xử lý nút xoá
    row.querySelector(".btn-delete").onclick = () => {
      cart = cart.filter(c => !(c.id === item.id && c.size === item.size));
      saveCart();
      renderCart();
      updateCartCount();

      if (typeof showToast === "function") {
        showToast(`🗑️ Đã xóa <strong>${product.name}</strong> khỏi giỏ hàng.`, "danger");
      }
    };

    // Tăng / giảm số lượng
    const input = row.querySelector(".quantity");
    row.querySelector(".btn-minus").onclick = () => {
      let newQty = parseInt(input.value) - 1;
      if (newQty <= 0) return;
      input.value = newQty;
      item.quantity = newQty;
      saveCart();
      renderCart();
      updateCartCount();
    };

    row.querySelector(".btn-plus").onclick = () => {
      let newQty = parseInt(input.value) + 1;
      input.value = newQty;
      item.quantity = newQty;
      saveCart();
      renderCart();
      updateCartCount();
    };

    cartBody.appendChild(row);
  });

  // Tính tổng giá sau khi đã render xong
  updateTotalPrice();
}

// Tính tổng giá theo checkbox được chọn
function updateTotalPrice() {
  const rows = cartBody.querySelectorAll("tr");
  let total = 0;

  rows.forEach((row, index) => {
    const checkbox = row.querySelector(".product-check");
    if (!checkbox || !checkbox.checked) return;

    const item = cart[index];
    const product = getProductById(item.id);
    if (!product) return;

    const originalPrice = product.price;
    const finalPrice = product.discount > 0
      ? Math.round(originalPrice * (100 - product.discount) / 100)
      : originalPrice;

    const quantity = item.quantity || 1;
    total += finalPrice * quantity;
  });

  totalPriceEl.textContent = total.toLocaleString();
}

// Khởi tạo
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();

  // Gắn sự kiện checkbox thay đổi → cập nhật tổng
  cartBody.addEventListener("change", function (e) {
    if (e.target && e.target.classList.contains("product-check")) {
      updateTotalPrice();
    }
  });
});
