import * as g from "./global-script.js";

const nextPrevSectionElem = document.getElementById("project-next-prev-section");

const nextPrevOptions = { root: null, threshold: 0.0, rootMargin: "-5% 0% -5% 0%" };

document.addEventListener("DOMContentLoaded", () => {
    // ---------- global functionalities for every page START ----------
    g.onPageLoad();
    // header and footer functionalities
    g.backToTopHandler();
    g.navLinksHandler();
    // ---------- global functionalities for every page END ----------

    toggleHeadImg();
    g.toggleContactSectionVisibility();

    // Scroll event listener
    window.addEventListener("scroll", () => {
        toggleHeadImg();
        g.toggleContactSectionVisibility();
    });

    // ////// Inview appear Events //////
    // // create all Oberservers
    let mainElemObserver = new IntersectionObserver(onEntry, g.whiteSectionElemOptions);
    let nextPrevObserver = new IntersectionObserver(onEntry, nextPrevOptions);

    if (g.mainElem) {
        mainElemObserver.observe(g.mainElem);
    }
    
    nextPrevObserver.observe(nextPrevSectionElem);
});

function onEntry(entry) {
    entry.forEach((change) => {
        if (change.isIntersecting) {
            change.target.classList.add('inview');
        } else {
            change.target.classList.remove('inview');
        }
    });
}

function toggleHeadImg() {
    g.bodyElem.classList.toggle('scrolled-enough', g.mainElem.getBoundingClientRect().top <= -(window.innerHeight / 2));
}

