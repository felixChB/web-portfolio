import * as g from "./global-script.js";

const aboutTextElem = document.querySelector(".appear-text-wrapper");
const projectsSectionElem = document.getElementById("projects");
const projectCardElems = document.querySelectorAll(".project-card");

////// Inview appear Events //////
// Observer options


// create all Oberservers
let projectsElemObserver = new IntersectionObserver(onEntry, g.whiteSectionElemOptions);
let projectCardsObserver = new IntersectionObserver(g.onSlideInEntry, g.slideInOptions);

document.addEventListener("DOMContentLoaded", () => {

    // ---------- global functionalities for every page START ----------
    g.onPageLoad();
    // header and footer functionalities
    g.backToTopHandler();
    g.navLinksHandler();
    // ---------- global functionalities for every page END ----------

    scrolledEnoughIndexTrigger();

    g.splitTextIntoLines(aboutTextElem);
    g.appearTextObserver.observe(aboutTextElem);

    window.addEventListener('resize', () => {
        // Re-split the text to calculate new line breaks
        g.splitTextIntoLines(aboutTextElem);
    });

    g.toggleContactSectionVisibility();

    g.customCursorHandler(g.cursor, projectCardElems, 300);

    window.addEventListener("scroll", () => {
        g.toggleContactSectionVisibility();
        scrolledEnoughIndexTrigger();
    });


    // let Observers observe Elemenets

    if (projectCardElems) {
        for (let card of projectCardElems) {
            projectCardsObserver.observe(card);
        }
    }

    if (projectsSectionElem) {
        projectsElemObserver.observe(projectsSectionElem);
    }
});

function scrolledEnoughIndexTrigger() {
    g.bodyElem.classList.toggle('scrolled-enough', window.scrollY > g.mainHeaderElem.getBoundingClientRect().height);
}

function onEntry(entry) {
    entry.forEach((change) => {
        if (change.isIntersecting) {
            change.target.classList.add('inview');

            // change body background to black for the footer when below or within projects section
            if (change.target == projectsSectionElem) {
                g.bodyElem.classList.add("black-body");
            }
        } else {
            change.target.classList.remove('inview');

            // change body background back to white for home border when above projects section
            if (change.target == projectsSectionElem) {
                if (change.target.getBoundingClientRect().top > 0)
                    g.bodyElem.classList.remove("black-body");
            }
        }
    });
}