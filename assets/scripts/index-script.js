import * as g from "./global-script.js";

const appearTextElems = document.getElementsByClassName("appear-text-parts");
const projectsSectionElem = document.getElementById("projects");
const projectCardElems = document.querySelectorAll(".project-card");

////// Inview appear Events //////
// Observer options
const appearTextOptions = { root: null, threshold: 0.5, rootMargin: "10% 0% -10% 0%" };

// create all Oberservers
let appearTextObserver = new IntersectionObserver(onEntry, appearTextOptions);
let projectsElemObserver = new IntersectionObserver(onEntry, g.whiteSectionElemOptions);
let projectCardsObserver = new IntersectionObserver(onEntry, g.slideInOptions);

document.addEventListener("DOMContentLoaded", () => {

    // ---------- global functionalities for every page START ----------
    g.onPageLoad();
    // header and footer functionalities
    g.backToTopHandler();
    g.navLinksHandler();
    // ---------- global functionalities for every page END ----------

    g.toggleContactSectionVisibility();

    g.customCursorHandler(g.cursor, projectCardElems);

    window.addEventListener("scroll", () => {
        g.toggleContactSectionVisibility();
        g.bodyElem.classList.toggle('scrolled-enough', window.scrollY > g.mainHeaderElem.getBoundingClientRect().height);
    });


    // let Observers observe Elemenets
    if (appearTextElems) {
        for (let elem of appearTextElems) {
            appearTextObserver.observe(elem);
        }
    }

    if (projectCardElems) {
        for (let card of projectCardElems) {
            projectCardsObserver.observe(card);
        }
    }

    if (projectsSectionElem) {
        projectsElemObserver.observe(projectsSectionElem);
    }

    appearTextObserver.observe(g.contactSectionElem);
});

function onEntry(entry) {
    entry.forEach((change) => {
        if (change.isIntersecting) {
            change.target.classList.add('inview');

            // change body background to black for the footer when below or within projects section
            if (change.target == projectsSectionElem) {
                if (!g.bodyElem.classList.contains("black-body")) {
                    g.bodyElem.classList.add("black-body");
                }
            }
        } else {
            change.target.classList.remove('inview');

            // change body background back to white for home border when above projects section
            if (change.target == projectsSectionElem) {
                if (change.target.getBoundingClientRect().top > 0)
                    if (g.bodyElem.classList.contains("black-body")) {
                        g.bodyElem.classList.remove("black-body");
                    }
            }
        }
    });
}