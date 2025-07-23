// Lấy ID sản phẩm từ URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));
const product = products.find(p => p.id === productId);

if (product) {
  document.getElementById("product-image").src = product.image;
  document.getElementById("product-name").textContent = product.name;

  const priceEl = document.getElementById("product-price");
  if (product.discount > 0) {
    const discountedPrice = Math.round(product.price * (100 - product.discount) / 100);
    priceEl.innerHTML = `
      <span class="text-danger fw-bold">${discountedPrice.toLocaleString()}đ</span>
      <span class="text-muted text-decoration-line-through ms-2">${product.price.toLocaleString()}đ</span>
    `;
  } else {
    priceEl.textContent = product.price.toLocaleString() + "đ";
  }

  document.getElementById("product-description").textContent = product.description;

  // Rating
  const ratingContainer = document.getElementById("product-rating");
  ratingContainer.innerHTML = `${generateStars(product.rating)} <span class="ms-2">(${product.sold} đã bán)</span>`;

  // Size
  const sizeSelect = document.getElementById("size-select");
  sizeSelect.innerHTML = product.size.map(size => `<option value="${size}">${size}</option>`).join("");

  // Thêm giỏ hàng
  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    const size = sizeSelect.value;
    const quantity = parseInt(document.getElementById("quantity").value);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product.id && item.size === size);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ id: product.id, size, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    if (typeof showToast === "function") {
      showToast(`🛒 Đã thêm <strong>${product.name}</strong> vào giỏ hàng!`, "success");
    }

    if (typeof updateCartCount === "function") {
      updateCartCount();
    }
  });
} else {
  document.getElementById("product-detail").innerHTML = "<p class='text-danger'>Không tìm thấy sản phẩm.</p>";
}

function renderSuggestedProducts(currentProductId) {
  const container = document.getElementById("suggested-products");
  if (!container) return;

  const suggestions = products
    .filter(p => p.id !== currentProductId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  container.innerHTML = suggestions.map(p => {
    const discounted = p.discount > 0;
    const newPrice = Math.round(p.price * (100 - p.discount) / 100);
    return `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${p.image}" class="card-img-top p-3" style="height: 250px; object-fit: contain;" alt="${p.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${p.name}</h5>
            ${discounted
              ? `<p><span class="text-danger fw-bold">${newPrice.toLocaleString()}đ</span>
                   <span class="text-muted text-decoration-line-through ms-2">${p.price.toLocaleString()}đ</span></p>`
              : `<p class="text-danger fw-bold">${p.price.toLocaleString()}đ</p>`
            }
            <div class="mb-2">${generateStars(p.rating)} <span class="ms-1 text-muted">(${p.sold} đã bán)</span></div>
            <a href="Chitietsanpham.html?id=${p.id}" class="btn btn-outline-dark btn-sm">Xem chi tiết</a>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

renderSuggestedProducts(productId);
