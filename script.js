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

window.addEventListener("scroll", () => {
    //console.log(window.scrollY);
    let scrollPosition = window.scrollY;
    let windowHeight = window.innerHeight;

    let scrollDelta = scrollPosition / windowHeight;
});


//////////// INTERSECTION OBSERVER ////////////
// callback function to execute when entries are observed
function onEntry(entry) {
    entry.forEach((change) => {
        console.log(change);
        if (change.isIntersecting) {
            change.target.classList.add('visible');
        } else {
            change.target.classList.remove('visible');
        }
    });
}

// list of options
let options = {
    root: null,
    threshold: 0.7,
    rootMargin: "-20% 0% -20% 0%"
};

// instantiate a new Intersection Observer
let observer = new IntersectionObserver(onEntry, options);

// list of headings to be observed
let h2s = document.querySelectorAll('h2');

// loop through all h2s
// pass each element to observe method
// ES2015 for-of loop can traverse through DOM h2s
for (let elm of h2s) {
    observer.observe(elm);
}