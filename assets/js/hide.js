document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("toggle-stats");
  const stats = document.getElementById("visitor-stats");

  // Nếu không tìm thấy button hoặc counter thì dừng
  if (!btn || !stats) {
    console.warn("toggle-stats hoặc visitor-stats không tồn tại.");
    return;
  }

  btn.addEventListener("click", () => {
    const isHidden = stats.style.display === "none";

    if (isHidden) {
      stats.style.display = "block";
      btn.textContent = "Hide";
    } else {
      stats.style.display = "none";
      btn.textContent = "Show";
    }
  });
});
