// ===============================
// RENDER SERVICES FROM JSON
// ===============================
async function renderServices(lang) {
    const container = document.getElementById("service-areas");
    if (!container) return;

    const res = await fetch(`/assets/lang/${lang}/services.json`);
    const data = await res.json();

    container.innerHTML = ""; // clear old content

    data.areas.forEach(area => {
        const card = document.createElement("div");
        card.className = "service-card";

        card.innerHTML = `
            <h3>${area.name}</h3>
            <p>${area.description}</p>
            <ul>
                ${area.services.map(s => `<li>${s}</li>`).join("")}
            </ul>
        `;

        container.appendChild(card);
    });
}

// Gọi lại khi đổi ngôn ngữ
document.addEventListener("DOMContentLoaded", () => {
    renderServices(currentLang);
});

document.getElementById("lang-toggle").addEventListener("click", () => {
    setTimeout(() => renderServices(currentLang), 150);
});
