async function loadPost() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const lang = currentLang;
    const res = await fetch(`/assets/lang/${lang}/blog.json`);
    const blogData = await res.json();

    const postMeta = blogData.posts.find(p => p.id === id);

    document.getElementById("post-title").innerText = postMeta.title;
    document.getElementById("post-date").innerText = postMeta.date;

    const mdRes = await fetch(`/blog/posts/${id}.md`);
    const mdText = await mdRes.text();

    document.getElementById("post-content").innerHTML = marked.parse(mdText);
}

document.addEventListener("DOMContentLoaded", loadPost);
