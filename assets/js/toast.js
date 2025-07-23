function showToast(message, type = "success") {
  const toastId = Date.now(); // unique ID
  const bgClass = type === "success" ? "bg-success" : "bg-danger";

  const toastHTML = `
    <div id="toast-${toastId}" class="toast align-items-center text-white ${bgClass} border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Đóng"></button>
      </div>
    </div>
  `;

  const container = document.getElementById("toast-container");
  if (container) {
    container.insertAdjacentHTML("beforeend", toastHTML);
    const toastEl = document.getElementById(`toast-${toastId}`);
    const toast = new bootstrap.Toast(toastEl);
    toast.show();

    toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
  }
}
