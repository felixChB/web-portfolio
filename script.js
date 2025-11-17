const cursor = document.getElementById("cursor");
const aElements = document.querySelectorAll("a");

const h2Elements = document.querySelectorAll("h2");

h2Elements.forEach((h2) => {
    dotEventlisteners(h2);
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



    h2Elements.forEach((h2) => {
        if (h2.classList.contains("visible")) {
            let elementsCurrentScroll = h2.dataset.scrollY;
            let scrolled = window.scrollY - elementsCurrentScroll;
            h2.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
});


//////////// INTERSECTION OBSERVER ////////////
// callback function to execute when entries are observed
function onEntry(entry) {
    entry.forEach((change) => {
        console.log(change);
        if (change.isIntersecting) {
            change.target.classList.add('visible');

            let currentScroll = window.scrollY;

            change.target.dataset.scrollY = currentScroll;
        } else {
            change.target.classList.remove('visible');
            change.target.style.transform = ``;

            change.target.dataset.scrollY = 0;
        }
    });
}

// list of options
let options = {
    root: null,
    threshold: 1.0,
    rootMargin: "0% 0% -20% 0%"
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