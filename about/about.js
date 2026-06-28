async function loadAbout(lang) {
    const res = await fetch(`/assets/lang/${lang}/about.json`);
    const data = await res.json();

    // Chỉ render các key dạng text
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

    // KHÔNG render values và pillars ở đây nữa
    // Vì lang.js đã tự động render theo data-i18n="about.values.0"
}
