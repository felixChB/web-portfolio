// global html elements
export const bodyElem = document.querySelector("body");
export const mainElem = document.querySelector("main");
export const mainHeaderElem = document.getElementById("main-header");
export const burgerMenuElem = document.getElementById("burger-menu");
export const contactSectionElem = document.getElementById("contact");
export const cursorViewProjectElem = document.getElementById('cursor-view-project');
export const cursorImgElem = document.getElementById('cursor-img');

export const navLinks = document.querySelectorAll(".nav-link");
export const backToTopLink = document.querySelector(".back-to-top-wrapper");

// observer options for the white section element (index: projects, project: main)
export const whiteSectionElemOptions = { root: null, threshold: 0.0, rootMargin: "-40% 0% -20% 0%" };
export const slideInOptions = { root: null, threshold: 0.0, rootMargin: "10% 0% 0% 0%" };
export const appearTextOptions = { root: null, threshold: 0.5, rootMargin: "10% 0% -10% 0%" };

export const appearTextObserver = new IntersectionObserver(onSlideInEntry, appearTextOptions);

export function onPageLoad() {

    console.log("DOM fully loaded and parsed");
    console.log("Initial scrollY:", window.scrollY);

    // Start up stuff
    bodyElem.classList.add("page-loaded");
}

export function backToTopHandler() {
    backToTopLink.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToSection("top");
    });
}

export function toggleContactSectionVisibility() {
    // when main is scrolled up halfway through the window height past the contact section
    if (mainElem.getBoundingClientRect().bottom <= (window.innerHeight * 0.4)) {
        if (!contactSectionElem.classList.contains('inview')) {
            contactSectionElem.classList.add('inview');

            //scroll to the bottom when contact inview is triggered
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        }
    } else {
        if (contactSectionElem.classList.contains('inview')) {
            contactSectionElem.classList.remove('inview');
        }
    }
}

export function navLinksHandler() {
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const sectionId = link.getAttribute("nav-section-value");
            if (!sectionId) return;

            e.preventDefault();

            if (link.classList.contains("menu-link")) {
                burgerMenuElem.classList.remove("open");
                bodyElem.classList.remove("menu-open");
                setTimeout(() => {
                    scrollToSection(sectionId);
                }, 600);
                return;
            } else {
                scrollToSection(sectionId);
            }
        });
    });
}

export function scrollToSection(sectionId) {
    switch (sectionId) {
        case "about":
            window.scrollTo({
                top: document.getElementById("about").offsetTop,
                behavior: "smooth"
            });
            break;
        case "projects":
            window.scrollTo({
                top: document.getElementById("projects").offsetTop,
                behavior: "smooth"
            });
            break;
        case "contact":
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
            break;
        case "top":
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            break;
        case "open-menu":
            burgerMenuElem.classList.add("open");
            bodyElem.classList.add("menu-open");
            break;
        case "close-menu":
            burgerMenuElem.classList.remove("open");
            bodyElem.classList.remove("menu-open");
            break;
        default:
            break;
    }
}

export function customCursorHandler(cursor, targets, smoothness = 300) {

    // 1. Only run logic if the device has a mouse (fine pointer)
    const hasMouse = window.matchMedia('(pointer: fine)').matches;

    if (hasMouse) {
        // 2. Update coordinates on mouse move
        window.addEventListener('mousemove', (e) => {

            cursor.animate({
                transform: `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
            }, {
                duration: smoothness,
                fill: "forwards"
            });
        });

        // 3. Show/Hide logic for specific elements
        targets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursor.classList.add('is-active');
            });

            target.addEventListener('mouseleave', () => {
                cursor.classList.remove('is-active');
            });
        });
    }
}

export function onSlideInEntry(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add('inview');
        } else {
            if (entry.boundingClientRect.top > 0) {
                entry.target.classList.remove('inview');
            }
        }
    });
}

// split text content of an element into lines wrapped in divs for line-by-line animation
// gemini made
export function splitTextIntoLines(container) {
    // Save original text on first run to prevent losing words on repeated resizes
    if (!container.dataset.originalText) {
        container.dataset.originalText = container.innerText;
    }

    const originalText = container.dataset.originalText;
    container.innerHTML = ''; // Clear for rebuild

    // Step 1: Wrap words in temporary spans to measure their Y-position
    const words = originalText.split(' ');
    words.forEach(word => {
        const span = document.createElement('span');
        // if (word.) {
        // insert code here to get the last word element to not add &nbsp;
        // }
        span.innerHTML = word + '&nbsp;';
        span.style.display = 'inline-block';
        container.appendChild(span);
    });

    // Step 2: Group words into lines based on their vertical offset
    const lines = [];
    let currentLine = [];
    let lastOffset = -1;

    const wordSpans = container.querySelectorAll('span');
    wordSpans.forEach(span => {
        if (span.offsetTop !== lastOffset) {
            console.log(span.offsetTop, lastOffset);
            if (currentLine.length > 0) lines.push(currentLine);
            currentLine = [];
            lastOffset = span.offsetTop;
        }
        currentLine.push(span.innerText);
    });

    if (currentLine.length > 0) lines.push(currentLine);

    // Step 3: Rebuild the HTML with your specific classes
    container.innerHTML = ''; // Clear temp spans
    lines.forEach((lineText, index) => {
        const lineMask = document.createElement('div');
        lineMask.classList.add('appear-text-line');
        lineMask.style.transitionDelay = `${index * 0.07}s`;

        for (let i = 0; i < lineText.length; i++) {
            const span = document.createElement('span');
            span.innerHTML = lineText[i];
            span.classList.add('appear-text-word');
            // span.style.transitionDelay = `${index * 0.1}s`;
            lineMask.appendChild(span);
        }

        container.appendChild(lineMask);
    });
}