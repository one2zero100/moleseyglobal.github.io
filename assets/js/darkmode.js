document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("darkToggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });
});
