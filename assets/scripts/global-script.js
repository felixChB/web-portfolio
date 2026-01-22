// global html elements
export const bodyElem = document.querySelector("body");
export const mainElem = document.querySelector("main");
export const mainHeaderElem = document.getElementById("main-header");
export const burgerMenuElem = document.getElementById("burger-menu");
export const contactSectionElem = document.getElementById("contact");
export const cursor = document.getElementById('cursor');

export const navLinks = document.querySelectorAll(".nav-link");
export const backToTopLink = document.querySelector(".back-to-top-wrapper");

// observer options for the white section element (index: projects, project: main)
export const whiteSectionElemOptions = { root: null, threshold: 0.0, rootMargin: "-40% 0% -20% 0%" };

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
            e.preventDefault();
            const sectionId = link.getAttribute("nav-section-value");
            if (!sectionId) return;

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

export function customCursorHandler(cursor, targets) {

    // 1. Only run logic if the device has a mouse (fine pointer)
    const hasMouse = window.matchMedia('(pointer: fine)').matches;

    if (hasMouse) {
        // 2. Update coordinates on mouse move
        window.addEventListener('mousemove', (e) => {

            cursor.animate({
                transform: `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(20px, 20px)`
            }, {
                duration: 200,
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