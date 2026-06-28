// ===============================
// 1. Cấu hình ngôn ngữ
// ===============================
const DEFAULT_LANG = "en";
let currentLang = localStorage.getItem("lang") || DEFAULT_LANG;

// ===============================
// 2. Load tất cả JSON trong thư mục ngôn ngữ
// ===============================
async function loadLanguage(lang) {
    let translations = {};

    try {
        // Lấy danh sách file JSON trong thư mục ngôn ngữ
        const manifest = await fetch(`/assets/lang/${lang}/manifest.json?v=1`).then(r => r.json());

        // Load tất cả file JSON song song
        const promises = manifest.map(async file => {
            const moduleName = file.replace(".json", "");
            const res = await fetch(`/assets/lang/${lang}/${file}?v=1`);
            if (res.ok) {
                translations[moduleName] = await res.json();
            }
        });

        await Promise.all(promises);

    } catch (e) {
        console.error("❌ Lỗi load ngôn ngữ:", e);
    }

    applyTranslations(translations);
}

// ===============================
// 3. Áp dụng dịch vào HTML
// ===============================
function applyTranslations(translations) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const path = el.getAttribute("data-i18n").split(".");
        const module = path.shift(); // ví dụ: "about"

        let value = translations[module];

        // Duyệt sâu theo từng phần còn lại: ["values", "0"] hoặc ["vision_title"]
        path.forEach(k => {
            if (value !== undefined && value !== null) {
                value = value[k];
            }
        });

        if (value !== undefined && value !== null) {
            el.innerHTML = value;
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
