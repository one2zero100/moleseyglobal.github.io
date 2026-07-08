document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("stats-box");
  const toggle = document.getElementById("stats-toggle");

  if (!box || !toggle) return;

  toggle.addEventListener("click", () => {
    const isHidden = box.classList.toggle("hidden");
    toggle.innerHTML = isHidden ? "&#187;" : "&#171;"; 
    // « when visible, » when hidden
  });
});
