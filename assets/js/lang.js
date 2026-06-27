// ===============================
// 1. Cấu hình ngôn ngữ
// ===============================
const DEFAULT_LANG = "en";
let currentLang = localStorage.getItem("lang") || DEFAULT_LANG;

// ===============================
// 2. Load JSON theo ngôn ngữ
// ===============================
async function loadLanguage(lang) {
    const modules = ["navbar", "services", "home", "footer", "blog", "about"];
    let translations = {};

    for (const module of modules) {
        try {
            const res = await fetch(`/assets/lang/${lang}/${module}.json?v=1`);
            if (!res.ok) {
                console.warn(`❌ Không load được file: ${module}.json`);
                continue;
            }
            translations[module] = await res.json();
        } catch (e) {
            console.warn(`❌ Lỗi khi load module: ${module}`, e);
        }
    }

    applyTranslations(translations);
}

// ===============================
// 3. Áp dụng dịch vào HTML
// ===============================
function applyTranslations(translations) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n"); 
        const [module, field] = key.split(".");

        if (translations[module] && translations[module][field]) {
            el.innerHTML = translations[module][field];
        } else {
            console.warn(`⚠️ Không tìm thấy key: ${module}.${field}`);
        }
    });
}

// ===============================
// 4. Chuyển đổi ngôn ngữ
// ===============================
function toggleLanguage() {
    currentLang = currentLang === "en" ? "vi" : "en";
    localStorage.setItem("lang", currentLang);
    updateFlagIcon();
    loadLanguage(currentLang);
}

// ===============================
// 5. Đổi icon quốc kỳ
// ===============================
function updateFlagIcon() {
    const btn = document.getElementById("lang-toggle");
    btn.innerHTML = currentLang === "en" ? "🇻🇳" : "🇬🇧";
}

// ===============================
// 6. Khởi động
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    updateFlagIcon();
    loadLanguage(currentLang);

    document.getElementById("lang-toggle")
        .addEventListener("click", toggleLanguage);
});
