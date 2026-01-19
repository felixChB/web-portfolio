// global html elements
export const bodyElem = document.querySelector("body");
export const mainHeaderElem = document.getElementById("main-header");
export const burgerMenuElem = document.getElementById("burger-menu");
export const contactSectionElem = document.getElementById("contact");

export const navLinks = document.querySelectorAll(".nav-link");
export const backToTopLink = document.querySelector(".back-to-top-wrapper");


export function onEntry(entry) {
    entry.forEach((change) => {
        if (change.isIntersecting) {
            change.target.classList.add('inview');

            // change body background to black for the footer when below or within projects section
            if (change.target == projectsSectionElem) {
                if (!bodyElem.classList.contains("black-body")) {
                    bodyElem.classList.add("black-body");
                }
            }
        } else {
            change.target.classList.remove('inview');

            // change body background back to white for home border when above projects section
            if (change.target == projectsSectionElem) {
                if (change.target.getBoundingClientRect().top > 0)
                    if (bodyElem.classList.contains("black-body")) {
                        bodyElem.classList.remove("black-body");
                    }
            }
        }
    });
}


export function onPageLoad() {

    console.log("DOM fully loaded and parsed");
    console.log("Initial scrollY:", window.scrollY);

    // Start up stuff
    bodyElem.classList.add("page-loaded");
}

////// Inview appear Events //////

// Observer options
export const appearTextOptions = { root: null, threshold: 0.5, rootMargin: "10% 0% -10% 0%" };
export const projectsElemOptions = { root: null, threshold: 0.0, rootMargin: "-50% 0% -20% 0%" };
export const projectCardsOptions = { root: null, threshold: 0.0, rootMargin: "10% 0% 0% 0%" };

// create all Oberservers
let appearTextObserver = new IntersectionObserver(onEntry, appearTextOptions);
let projectsElemObserver = new IntersectionObserver(onEntry, projectsElemOptions);
let projectCardsObserver = new IntersectionObserver(onEntry, projectCardsOptions);

// let Observers observe Elemenets
if (appearTextElems) {
    for (let elem of appearTextElems) {
        appearTextObserver.observe(elem);
    }
}

if (projectCardsElems) {
    for (let card of projectCardsElems) {
        projectCardsObserver.observe(card);
    }
}

if (projectsSectionElem) {
    projectsElemObserver.observe(projectsSectionElem);
}

appearTextObserver.observe(contactSectionElem);

///// NEW SCROLL EFFECT CODE /////
window.addEventListener("scroll", () => {

    // console.log("ScrollY:", window.scrollY);

    bodyElem.classList.toggle('scrolled', window.scrollY > mainHeaderElem.getBoundingClientRect().height);
});
///// NEW SCROLL EFFECT CODE /////

backToTopLink.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToSection("top");
});

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
                }, 300);
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