async function loadAbout(lang) {
    const res = await fetch(`/assets/lang/${lang}/about.json`);
    const data = await res.json();

    // Render text fields (hero, story, vision, mission)
    const textKeys = [
        "hero_title",
        "hero_subtitle",
        "story_title",
        "story_text",
        "vision_title",
        "vision_text",
        "mission_title",
        "mission_text",
        "values_title",
        "pillars_title"
    ];

    textKeys.forEach(key => {
        const el = document.querySelector(`[data-i18n="about.${key}"]`);
        if (el) el.innerHTML = data[key];
    });

    // Render values (array)
    const values = document.querySelectorAll(".value-card");
    values.forEach((el, i) => {
        el.innerHTML = data.values[i];
    });

    // Render pillars (array)
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
