const aElements = document.querySelectorAll("a");
const htmlBody = document.querySelector("body");

const appearTextElems = document.getElementsByClassName("appear-text-parts");

const imgs = document.querySelectorAll("img");

const elem = document.getElementById("parallax-img");

const contactSection = document.getElementById("contact");
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
    let projectsElemOptions = { root: null, threshold: 0.0, rootMargin: "-50% 0% -20% 0%" };
    let projectCardsOptions = { root: null, threshold: 0.5, rootMargin: "0% 0% -10% 0%" };

    // create all Oberservers
    let appearTextObserver = new IntersectionObserver(onEntry, appearTextOptions);
    let parallaxImgObserver = new IntersectionObserver(onImgEntry, parallaxImgOptions);
    let projectsElemObserver = new IntersectionObserver(onEntry, projectsElemOptions);
    let projectCardsObserver = new IntersectionObserver(onEntry, projectCardsOptions);

    // let Observers observe Elemenets
    for (let elem of appearTextElems) {
        appearTextObserver.observe(elem);
    }

    parallaxImgObserver.observe(elem);

    for (let card of projectCards) {
        projectCardsObserver.observe(card);
    }

    projectsElemObserver.observe(projectsSection);

    appearTextObserver.observe(contactSection);


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

    htmlBody.classList.toggle('scrolled', window.scrollY > headerElem.getBoundingClientRect().height);
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
        scrollToSection(sectionId);
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
        default:
            break;
    }
}