import * as g from "./global-script.js";

const mainElem = document.getElementById("project-content");

document.addEventListener("DOMContentLoaded", () => {
    // ---------- global functionalities for every page START ----------
    g.onPageLoad();
    // header and footer functionalities
    g.backToTopHandler();
    g.navLinksHandler();
    // ---------- global functionalities for every page END ----------


    // Scroll event listener
    window.addEventListener("scroll", () => {
        toggleHeadImg();
    });

    // ////// Inview appear Events //////
    // // create all Oberservers
    let mainElemObserver = new IntersectionObserver(onEntry, g.whiteSectionElemOptions);

    if (mainElem) {
        mainElemObserver.observe(mainElem);
    }

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
    g.bodyElem.classList.toggle('scrolled-enough', mainElem.getBoundingClientRect().top <= -(window.innerHeight / 2));
}

