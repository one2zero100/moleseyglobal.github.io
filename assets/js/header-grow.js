document.addEventListener("scroll", () => {
    const header = document.querySelector(".header");

    if (window.scrollY > 40) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});
