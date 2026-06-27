async function loadBlogList(lang) {
    const container = document.getElementById("blog-list");
    if (!container) return;

    const res = await fetch(`/assets/lang/${lang}/blog.json`);
    const data = await res.json();

    container.innerHTML = "";

    data.posts.forEach(post => {
        const card = document.createElement("div");
        card.className = "blog-card";

        card.innerHTML = `
            <h3>${post.title}</h3>
            <div class="date">${post.date}</div>
            <p>${post.summary}</p>
            <a href="/blog/post.html?id=${post.id}" class="read-more">Read more →</a>
        `;

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadBlogList(currentLang);
});

document.getElementById("lang-toggle").addEventListener("click", () => {
    setTimeout(() => loadBlogList(currentLang), 150);
});
