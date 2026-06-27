async function loadPost() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    // Load metadata từ blog.json
    const res = await fetch(`../assets/lang/${currentLang}/blog.json`);
    const data = await res.json();

    const post = data.posts.find(p => p.id === id);
    if (!post) return;

    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-date").textContent = post.date;

    // Load nội dung Markdown
    const mdRes = await fetch(`posts/${id}.md`);
    const mdText = await mdRes.text();

    // Convert Markdown → HTML đơn giản
    const html = mdText
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
        .replace(/\*(.*)\*/gim, "<em>$1</em>")
        .replace(/\n/g, "<br>");

    document.getElementById("post-content").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", loadPost);
