const cursor = document.getElementById("cursor");
const aElements = document.querySelectorAll("a");

const h1Elements = document.querySelectorAll("h1");

h1Elements.forEach((h1) => {
    dotEventlisteners(h1);
});

aElements.forEach((a) => {
    dotEventlisteners(a);
});

document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function dotEventlisteners(element) {
    // Additional event listeners can be added here if needed
    element.addEventListener("mouseenter", () => {
        if (!cursor.classList.contains("active")) {
            cursor.classList.add("active");
        }
    });

    element.addEventListener("mouseleave", () => {
        if (cursor.classList.contains("active")) {
            cursor.classList.remove("active");
        }
    });
}