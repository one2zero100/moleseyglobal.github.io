async function loadAbout(lang) {
    const res = await fetch(`/assets/lang/${lang}/about.json`);
    const data = await res.json();

    // Render values
    const values = document.querySelectorAll(".value-card");
    values.forEach((el, i) => {
        el.innerHTML = data.values[i];
    });

    // Render pillars
    const pillars = document.querySelectorAll(".pillars-list li");
    pillars.forEach((el, i) => {
        el.innerHTML = data.pillars[i];
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadAbout(currentLang);
});

document.getElementById("lang-toggle").addEventListener("click", () => {
    setTimeout(() => loadAbout(currentLang), 150);
});
