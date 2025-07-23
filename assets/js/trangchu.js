document.addEventListener("DOMContentLoaded", () => {
  const trendingContainer = document.getElementById("trending-products");
  const newContainer = document.getElementById("new-products");
  const flashContainer = document.getElementById("flash-sale-products");

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

  function renderProducts(list, container) {
    container.innerHTML = "";
    list.forEach(product => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";
      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <a href="Chitietsanpham.html?id=${product.id}">
            <img src="${product.image}" class="card-img-top p-2" style="height: 250px; object-fit: contain;">
          </a>
          <div class="card-body text-center">
            <h5 class="card-title">${product.name}</h5>
            <div class="mb-2">${generateStars(product.rating)} <small class="text-muted">(${product.sold} đã bán)</small></div>
            <p class="card-text text-danger fw-bold">${product.price.toLocaleString()} VNĐ</p>
            <a href="Chitietsanpham.html?id=${product.id}" class="btn btn-dark">Xem chi tiết</a>
          </div>
        </div>`;
      container.appendChild(col);
    });
  }

  const trendingProducts = products.filter(p => p.sold > 20).sort((a, b) => b.sold - a.sold).slice(0, 3);
  const newProducts = products.filter(p => p.isNew).slice(0, 3);
  const flashProducts = products.filter(p => p.discount && p.discount > 0).slice(0, 3);

  renderProducts(trendingProducts, trendingContainer);
  renderProducts(newProducts, newContainer);
  renderProducts(flashProducts, flashContainer);
});
