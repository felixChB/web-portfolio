import * as globalScript from "./global-script.js";

const appearTextElems = document.getElementsByClassName("appear-text-parts");
const projectsSectionElem = document.getElementById("projects");
const projectCardsElems = document.querySelectorAll(".project-card");


window.addEventListener("scroll", () => {

    // console.log("ScrollY:", window.scrollY);

    bodyElem.classList.toggle('scrolled', window.scrollY > mainHeaderElem.getBoundingClientRect().height);
});