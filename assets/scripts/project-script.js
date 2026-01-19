import * as g from "./global-script.js";

// ---------- global functionalities for every page START ----------
g.onPageLoad();
// header and footer functionalities
g.backToTopHandler();
g.navLinksHandler();
// ---------- global functionalities for every page END ----------

const mainElem = document.getElementById("project-content");
const headImgElem = document.querySelector(".head-img-wrapper");

function onEntry(entry) {
    entry.forEach((change) => {
        if (change.isIntersecting) {
            change.target.classList.add('inview');
        } else {
            change.target.classList.remove('inview');
        }
    });
}

window.addEventListener("scroll", () => {


    g.bodyElem.classList.toggle('scrolled-enough', mainElem.getBoundingClientRect().top <= -(window.innerHeight / 2));
});

function toggleHeadImg(entry) {
    console.log("main halfwa through");
}

// ////// Inview appear Events //////
// // Observer options
// const appearTextOptions = { root: null, threshold: 0.5, rootMargin: "10% 0% -10% 0%" };
const headImgTriggerOptions = { root: null, threshold: 1.0, rootMargin: "100% 0% 0% 0%" };

// // create all Oberservers
// let appearTextObserver = new IntersectionObserver(onEntry, appearTextOptions);
let mainElemObserver = new IntersectionObserver(onEntry, g.whiteSectionElemOptions);
let headImgTriggerObserver = new IntersectionObserver(toggleHeadImg, headImgTriggerOptions);
// let projectCardsObserver = new IntersectionObserver(onEntry, projectCardsOptions);

// // let Observers observe Elemenets
// if (appearTextElems) {
//     for (let elem of appearTextElems) {
//         appearTextObserver.observe(elem);
//     }
// }

if (mainElem) {
    mainElemObserver.observe(mainElem);
    headImgTriggerObserver.observe(mainElem);
}