const cursor = document.getElementById("cursor");
const cursorText = document.getElementById("cursor-text");
const aElements = document.querySelectorAll("a");

const h2Elems = document.querySelectorAll("h2");
const appearTextElems = document.getElementsByClassName("appear-text-parts");

const imgs = document.querySelectorAll("img");

const elem = document.getElementById("parallax-img");

let projectCards = document.querySelectorAll(".project-card");

// list of options for the observer
let options = {
    root: null,
    threshold: 0.5,
    rootMargin: "10% 0% -10% 0%"
};

// h2Elems.forEach((h2) => {
//     dotEventlisteners(h2);
// });

// aElements.forEach((a) => {
//     dotEventlisteners(a);
// });

////// Cursor Movement //////
document.addEventListener("mousemove", (event) => {
    const interactableELem = event.target.closest(".interactable");
    const interacting = interactableELem !== null;

    animateCursor(event, interacting);
});

function animateCursor(event, interacting) {
    // if (interacting) {
    //     cursorText.innerHTML = "[View Project]";
    //     cursor.classList.add("active");
    // } else {
    //     setTimeout(() => {
    //         cursorText.innerHTML = "";
    //         cursor.classList.remove("active");
    //     }, 300);

    // }

    cursor.animate({
        transform: `translate(${event.clientX}px, ${event.clientY}px)`
    }, {
        duration: 200,
        fill: "forwards"
    });
}

//// Cursor Events //////
function dotEventlisteners(element) {
    // Additional event listeners can be added here if needed
    element.addEventListener("mouseenter", () => {
        if (!cursor.classList.contains("active")) {
            cursor.classList.add("active");
        }
    });

    element.addEventListener("mouseleave", () => {
        if (cursor.classList.contains("active")) {
            cursor.classList.remove("active");
        }
    });

    if (element.classList.contains("project-card")) {
        cursorText.innerHTML = "View Project";
    }
}

for (let card of projectCards) {
    card.addEventListener("mouseenter", () => {
        if (!cursor.classList.contains("active")) {
            cursor.classList.add("active");
        }
    });

    card.addEventListener("mouseleave", () => {
        if (cursor.classList.contains("active")) {
            cursor.classList.remove("active");
        }
    });
}

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

let observer = new IntersectionObserver(onEntry, options);

// loop through all h2s
for (let h2 of h2Elems) {
    observer.observe(h2);
}

for (let elem of appearTextElems) {
    observer.observe(elem);
}

// list of options for the observer
let imgOptions = {
    root: null,
    threshold: 0.0,
    rootMargin: "0% 0% 0% 0%"
};
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

let imgObserver = new IntersectionObserver(onImgEntry, imgOptions);

// loop through all imgs
// for (let elem of imgs) {
imgObserver.observe(elem);
// }

for (let card of projectCards) {
    imgObserver.observe(card);
}


///// NEW SCROLL EFFECT CODE /////
window.addEventListener("scroll", () => {

    imgScrollEffect();
    projectCardScaleEffect();

});
///// NEW SCROLL EFFECT CODE /////

function projectCardScaleEffect() {
    // projectCards.forEach((card) => {
    //     if (!card.classList.contains("inview")) return;

    //     let cardMin = window.innerHeight; // 0%
    //     let cardMax = window.innerHeight - card.getBoundingClientRect().height; // 100%
    //     console.log(card.getBoundingClientRect().top);

    //     const scrollDelta = card.getBoundingClientRect().top - cardMin; // Current scroll position relative to element center
    //     const maxParallaxDelta = cardMin - cardMax; // Maximum parallax movement

    //     const percentage = (scrollDelta / maxParallaxDelta) * -100;
    //     // console.log(parseFloat(percentage) + "%");

    //     card.dataset.percentage = percentage;

    //     let scalePercentage = Math.max(Math.min(percentage, 100), 0);

    //     let scaleValue = 0.5 + (scalePercentage / 100);

    //     // for a smooth animation
    //     card.animate({
    //         transform: `scale(${scaleValue})`
    //     }, { duration: 600, fill: "forwards" });
    // });

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
        card.style.transformOrigin = 'center center';
        card.style.transform = `scale(${scaleValue})`;

        // optional: expose progress for debugging / CSS hooks
        card.dataset.scaleProgress = (clamped * 100).toFixed(0);
    });
}

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


///// Hacker Effect on Nav Links /////
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// store interval ids per element
const hackerIntervals = new WeakMap();

const linkTexts = document.getElementsByClassName("link-text");

for (let link of linkTexts) {
    link.onmouseover = event => {
        hackerEffect(event);
    };
}

function hackerEffect(event) {
    let iteration = 0;

    const existingInterval = hackerIntervals.get(event.target);
    if (existingInterval) {
        clearInterval(existingInterval);
        hackerIntervals.delete(event.target);
    }

    const intervalId = setInterval(() => {
        event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return event.target.dataset.value[index];
                }

                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");

        if (iteration >= event.target.dataset.value.length) {
            clearInterval(intervalId);
            hackerIntervals.delete(event.target);
        }

        iteration += 1 / 3;
    }, 30);
}
///// Hacker Effect on Nav Links /////