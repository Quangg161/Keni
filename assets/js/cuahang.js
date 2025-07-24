// cuahang.js - sau khi cập nhật, loại bỏ logic thêm vào giỏ hàng trực tiếp

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const brandFilterContainer = document.getElementById("brand-filters");
const sortButtons = document.querySelectorAll("[data-sort]");
const cartCount = document.getElementById("cart-count");
const pagination = document.getElementById("pagination");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let activeBrands = new Set();
let searchTerm = "";
let currentSort = "new";
let currentPage = 1;
const productsPerPage = 6;

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push('<i class="fa-solid fa-star text-warning"></i>');
  }
  if (hasHalf && fullStars < 5) {
    stars.push('<i class="fa-regular fa-star text-warning"></i>');
  }
  while (stars.length < 5) {
    stars.push('<i class="fa-regular fa-star text-secondary"></i>');
  }
  return stars.join('');
}

function initBrandFilters() {
  const brands = [...new Set(products.map(p => p.brand))];
  brandFilterContainer.innerHTML = brands.map(brand => `
    <div class="form-check">
      <input class="form-check-input brand-checkbox" type="checkbox" value="${brand}" id="brand-${brand}" checked>
      <label class="form-check-label" for="brand-${brand}">${brand}</label>
    </div>
  `).join("");

  activeBrands = new Set(brands);

  document.querySelectorAll(".brand-checkbox").forEach(cb => {
    cb.addEventListener("change", () => {
      cb.checked ? activeBrands.add(cb.value) : activeBrands.delete(cb.value);
      currentPage = 1;
      renderProducts();
    });
  });
}

searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value.toLowerCase();
  currentPage = 1;
  renderProducts();
});

sortButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    sortButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentSort = btn.dataset.sort;
    currentPage = 1;
    renderProducts();
  });
});

function sortProducts(data) {
  switch (currentSort) {
    case "new":
      return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case "low":
      return data.sort((a, b) => a.price - b.price);
    case "high":
      return data.sort((a, b) => b.price - a.price);
    case "rating":
      return data.sort((a, b) => b.rating - a.rating);
    default:
      return data;
  }
}


function renderProducts() {
  let filtered = products.filter(p =>
    activeBrands.has(p.brand) && p.name.toLowerCase().includes(searchTerm)
  );

  filtered = sortProducts(filtered);
  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const start = (currentPage - 1) * productsPerPage;
  const productsToShow = filtered.slice(start, start + productsPerPage);

  productList.innerHTML = productsToShow.map(p => `
    <div class="col-md-4 mb-4">
      <div class="card h-100 border border-secondary-subtle">
        <a href="Chitietsanpham.html?id=${p.id}">
          <img src="${p.image}" class="card-img-top" alt="${p.name}">
        </a>
        <div class="card-body d-flex flex-column">
          <a href="Chitietsanpham.html?id=${p.id}" class="text-decoration-none text-dark">
            <h5 class="card-title">${p.name}</h5>
          </a>
          <div class="mb-1">${generateStars(p.rating)} <small class="text-muted">(${p.sold || 0} đã bán)</small></div>
          ${p.discount > 0
            ? `<p><span class="text-danger fw-bold">${Math.round(p.price * (100 - p.discount) / 100).toLocaleString()}đ</span>
               <span class="text-muted text-decoration-line-through ms-2">${p.price.toLocaleString()}đ</span></p>`
            : `<p class="text-danger fw-bold">${p.price.toLocaleString()}đ</p>`}
          <a href="Chitietsanpham.html?id=${p.id}" class="btn btn-outline-dark mt-auto">
            <i></i> Xem chi tiết
          </a>
        </div>
      </div>
    </div>
  `).join("");

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  pagination.innerHTML = "";
  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.onclick = (e) => {
      e.preventDefault();
      currentPage = i;
      renderProducts();
    };
    pagination.appendChild(li);
  }
}

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = total;
}

function init() {
  initBrandFilters();
  renderProducts();
  updateCartCount();
}

init();
