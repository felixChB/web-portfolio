const aElements = document.querySelectorAll("a");
const htmlBody = document.querySelector("body");

const h2Elems = document.querySelectorAll("h2");
const appearTextElems = document.getElementsByClassName("appear-text-parts");

const imgs = document.querySelectorAll("img");

const elem = document.getElementById("parallax-img");
const projectsSection = document.getElementById("projects");
const projectsWrapper = document.getElementById("project-wrapper");
const projectCards = document.querySelectorAll(".project-card");

const headerElem = document.querySelector("header");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    console.log("Initial scrollY:", window.scrollY);

    ////// Inview appear Events //////
    function onEntry(entry) {
        entry.forEach((change) => {
            if (change.isIntersecting) {
                change.target.classList.add('inview');
            } else {
                change.target.classList.remove('inview');
            }
        });
    }

    // Observer options
    let appearTextOptions = { root: null, threshold: 0.5, rootMargin: "10% 0% -10% 0%" };
    let parallaxImgOptions = { root: null, threshold: 0.0, rootMargin: "0% 0% 0% 0%" };
    let projectsElemOptions = { root: null, threshold: 0.0, rootMargin: "-50% 0% -5% 0%" };

    // create all Oberservers
    let appearTextObserver = new IntersectionObserver(onEntry, appearTextOptions);
    let parallaxImgObserver = new IntersectionObserver(onImgEntry, parallaxImgOptions);
    let projectsElemObserver = new IntersectionObserver(onEntry, projectsElemOptions);

    // let Observers observe Elemenets
    for (let h2 of h2Elems) {
        appearTextObserver.observe(h2);
    }

    for (let elem of appearTextElems) {
        appearTextObserver.observe(elem);
    }

    parallaxImgObserver.observe(elem);

    for (let card of projectCards) {
        parallaxImgObserver.observe(card);
    }

    projectsElemObserver.observe(projectsSection);


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



    // Check if the page is scrolled vertically
    // if (window.scrollY > 0) {
    //     projectCardScaleEffect();
    // }
});

///// NEW SCROLL EFFECT CODE /////
window.addEventListener("scroll", () => {
    // console.log("ScrollY:", window.scrollY);
    console.log("ProjectsWrapper Rect.top:", projectsWrapper.getBoundingClientRect().top);
    htmlBody.classList.toggle('scrolled', window.scrollY > headerElem.getBoundingClientRect().height);
    // imgScrollEffect();
    projectCardScaleEffect();
});
///// NEW SCROLL EFFECT CODE /////

function projectCardScaleEffect() {
    projectCards.forEach((card) => {
        if (!card.classList.contains("inview")) return;

        const rect = card.getBoundingClientRect();
        const vh = window.innerHeight;

        // start when the card is minimally visible (top at viewport bottom)
        const startTop = vh;
        // end when card reaches sticky position top: 10vh
        const endTop = vh * 0.18;

        // compute progress where 0 = just visible, 1 = at sticky position
        const progress = (startTop - rect.top) / (startTop - endTop);
        const clamped = Math.min(Math.max(progress, 0), 1);

        // scale from 0.7 -> 1
        const scaleValue = 0.7 + 0.3 * clamped;

        // apply immediately (smooth via CSS transition if desired)
        // card.style.transform = `scale(${scaleValue})`;

        // for a smooth animation
        card.animate({
            transform: `scale(${scaleValue})`
        }, { duration: 300, fill: "forwards" });

        // optional: expose progress for debugging / CSS hooks
        card.dataset.scaleProgress = (clamped * 100).toFixed(0);
    });
}

/*
function imgScrollEffect() {
    if (!elem.classList.contains("inview")) return;

    let imgMin = window.innerHeight; // 0%
    let imgMax = -elem.getBoundingClientRect().height; // 100%

    const scrollDelta = elem.getBoundingClientRect().top - imgMin; // Current scroll position relative to element center
    const maxParallaxDelta = imgMin - imgMax; // Maximum parallax movement

    const percentage = (scrollDelta / maxParallaxDelta) * -100;
    // console.log(parseFloat(percentage) + "%");

    elem.dataset.percentage = percentage;

    let positionPercentage = Math.max(Math.min(percentage, 100), 0);

    // for a smooth animation
    elem.animate({
        objectPosition: `50% ${30 - (20 * positionPercentage / 100)}%`
    }, { duration: 600, fill: "forwards" });
}
*/