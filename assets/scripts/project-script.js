import * as g from "./global-script.js";

const aboutTextElem = document.querySelector(".appear-text-wrapper");
const otherProjectSectionElem = document.getElementById("other-project-section");
const projectImgElems = document.querySelectorAll(".project-img");
const otherProjectLinkElems = document.querySelectorAll(".other-project-link-wrapper");

const nextPrevOptions = { root: null, threshold: 0.0, rootMargin: "-5% 0% -5% 0%" };

let projectImgsObserver = new IntersectionObserver(g.onSlideInEntry, g.slideInOptions);

document.addEventListener("DOMContentLoaded", () => {
    // ---------- global functionalities for every page START ----------
    g.onPageLoad();
    // header and footer functionalities
    g.backToTopHandler();
    g.navLinksHandler();
    // ---------- global functionalities for every page END ----------

    g.splitTextIntoLines(aboutTextElem);
    g.appearTextObserver.observe(aboutTextElem);

    window.addEventListener('resize', () => {
        // Re-split the text to calculate new line breaks
        g.splitTextIntoLines(aboutTextElem);
    });

    scrolledEnoughProjectTrigger();
    g.toggleContactSectionVisibility();

    g.customCursorHandler(g.cursorViewProjectElem, otherProjectLinkElems);
    g.customCursorHandler(g.cursorImgElem, otherProjectLinkElems, 200);

    // Scroll event listener
    window.addEventListener("scroll", () => {
        scrolledEnoughProjectTrigger();
        g.toggleContactSectionVisibility();
    });

    // ////// Inview appear Events //////
    // // create all Oberservers
    let mainElemObserver = new IntersectionObserver(onEntry, g.whiteSectionElemOptions);
    let nextPrevObserver = new IntersectionObserver(onEntry, nextPrevOptions);

    if (g.mainElem) {
        mainElemObserver.observe(g.mainElem);
    }

    nextPrevObserver.observe(otherProjectSectionElem);

    if (projectImgElems) {
        for (let img of projectImgElems) {
            projectImgsObserver.observe(img);
        }
    }

});

function onEntry(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('inview');
        } else {
            entry.target.classList.remove('inview');

        }
    });
}

// trigger to toggle the head image visibility
function scrolledEnoughProjectTrigger() {
    g.bodyElem.classList.toggle('scrolled-enough', g.mainElem.getBoundingClientRect().top <= -(window.innerHeight / 2));
}

