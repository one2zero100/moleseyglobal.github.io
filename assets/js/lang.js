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
        const manifestUrl = `assets/lang/${lang}/manifest.json?v=1`;
        const manifest = await fetch(manifestUrl).then(r => r.json());

        const promises = manifest.map(async file => {
            const moduleName = file.replace(".json", "");
            const fileUrl = `assets/lang/${lang}/${file}?v=1`;

            const res = await fetch(fileUrl);
            if (res.ok) {
                translations[moduleName] = await res.json();
            } else {
                console.warn(`⚠ Không load được file: ${fileUrl}`);
            }
        });

        await Promise.all(promises);

    } catch (err) {
        console.error("❌ Lỗi load ngôn ngữ:", err);
    }

    applyTranslations(translations);
}

// ===============================
// 3. Áp dụng dịch vào HTML
// ===============================
function applyTranslations(translations) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const path = el.getAttribute("data-i18n").split(".");
        const module = path.shift();

        let value = translations[module];

        path.forEach(k => {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                value = null;
            }
        });

        if (value !== null && value !== undefined) {
            el.innerHTML = value;
        }
    });
}

// ===============================
// 4. Cập nhật icon quốc kỳ (SVG)
// ===============================
function updateFlag() {
    const flagSrc = currentLang === "en"
        ? "/assets/flags/gb.svg"
        : "/assets/flags/vn.svg";

    const btn = document.getElementById("lang-toggle");
    btn.innerHTML = `<img src="${flagSrc}" class="flag-icon">`;
}

// ===============================
// 5. Chuyển đổi ngôn ngữ
// ===============================
function toggleLanguage() {
    currentLang = currentLang === "en" ? "vi" : "en";
    localStorage.setItem("lang", currentLang);

    updateFlag();
    loadLanguage(currentLang);
}

// ===============================
// 6. Khởi động
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    updateFlag();
    loadLanguage(currentLang);

    document.getElementById("lang-toggle")
        .addEventListener("click", toggleLanguage);
});
