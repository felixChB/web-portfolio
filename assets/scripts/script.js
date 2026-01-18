// global html elements
const bodyElem = document.querySelector("body");
const mainHeaderElem = document.getElementById("main-header");
const burgerMenuElem = document.getElementById("burger-menu");
const contactSectionElem = document.getElementById("contact");

let appearTextElems, projectsSectionElem, projectCardsElems;

if (bodyElem.classList.contains("index-page")) {

    // index html elements
    appearTextElems = document.getElementsByClassName("appear-text-parts");
    projectsSectionElem = document.getElementById("projects");
    projectCardsElems = document.querySelectorAll(".project-card");

} else if (bodyElem.classList.contains("project-page")) {

}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    console.log("Initial scrollY:", window.scrollY);

    // Start up stuff
    bodyElem.classList.add("page-loaded");

    ////// Inview appear Events //////
    function onEntry(entry) {
        entry.forEach((change) => {
            if (change.isIntersecting) {
                change.target.classList.add('inview');

                // change body background to black for the footer when below or within projects section
                if (change.target == projectsSectionElem) {
                    console.log("target is projects section element");
                    if (!bodyElem.classList.contains("black-body")) {
                        bodyElem.classList.add("black-body");
                    }
                }
            } else {
                change.target.classList.remove('inview');

                // change body background back to white for home border when above projects section
                if (change.target == projectsSectionElem) {
                    console.log("target is projects section element");
                    if (bodyElem.classList.contains("black-body")) {
                        bodyElem.classList.remove("black-body");
                    }
                }
            }
        });
    }

    // Observer options
    let appearTextOptions = { root: null, threshold: 0.5, rootMargin: "10% 0% -10% 0%" };
    let projectsElemOptions = { root: null, threshold: 0.0, rootMargin: "-50% 0% -20% 0%" };
    let projectCardsOptions = { root: null, threshold: 1.0, rootMargin: "40% 0% 5% 0%" };

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


    function onImgEntry(entry) {
        entry.forEach((change) => {
            // console.log(change);

            let elemtOffsetTop = change.target.getBoundingClientRect().top;

            if (elemtOffsetTop > window.innerHeight) {
                change.target.dataset.percentage = 0;
            } else if (elemtOffsetTop < 0) {
                change.target.dataset.percentage = 100;
            }

            if (change.isIntersecting) {
                change.target.classList.add('inview');
            } else {
                change.target.classList.remove('inview');
            }
        });
    }
});

///// NEW SCROLL EFFECT CODE /////
window.addEventListener("scroll", () => {

    console.log("ScrollY:", window.scrollY);

    bodyElem.classList.toggle('scrolled', window.scrollY > mainHeaderElem.getBoundingClientRect().height);
});
///// NEW SCROLL EFFECT CODE /////

const navLinks = document.querySelectorAll(".nav-link");
const backToTopLink = document.querySelector(".back-to-top-wrapper");

backToTopLink.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToSection("top");
});

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

function scrollToSection(sectionId) {

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