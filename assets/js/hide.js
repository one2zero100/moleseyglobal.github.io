document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("stats-box");
  const toggle = document.getElementById("stats-toggle");

  if (!box || !toggle) {
    console.error("stats-box or stats-toggle not found");
    return;
  }

  // initial arrow: « (box visible)
  toggle.textContent = "»";

  toggle.addEventListener("click", () => {
    const isHidden = box.classList.toggle("hidden");
    // when hidden, show » ; when visible, show «
    toggle.textContent = isHidden ? "»" : "«";
  });
});
