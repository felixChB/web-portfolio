import * as g from "./global-script.js";

const nextPrevSectionElem = document.getElementById("project-next-prev-section");
const projectImgElems = document.querySelectorAll(".project-img");

const nextPrevOptions = { root: null, threshold: 0.0, rootMargin: "-5% 0% -5% 0%" };

let projectImgsObserver = new IntersectionObserver(onEntry, g.slideInOptions);

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
            if (entry.boundingClientRect.top > 0) {
                entry.target.classList.remove('inview');
            }
        }
    });
}

function toggleHeadImg() {
    g.bodyElem.classList.toggle('scrolled-enough', g.mainElem.getBoundingClientRect().top <= -(window.innerHeight / 2));
}

