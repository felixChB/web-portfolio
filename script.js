const cursor = document.getElementById("cursor");
const aElements = document.querySelectorAll("a");

const h2Elems = document.querySelectorAll("h2");

const imgs = document.querySelectorAll("img");

const elem = document.getElementById("parallax-img");

// list of options for the observer
let options = {
    root: null,
    threshold: 0.5,
    rootMargin: "10% 0% -10% 0%"
};

h2Elems.forEach((h2) => {
    dotEventlisteners(h2);
});

aElements.forEach((a) => {
    dotEventlisteners(a);
});

////// Cursor Movement //////
document.addEventListener("mousemove", (event) => {
    cursor.animate({
        transform: `translate(${event.clientX}px, ${event.clientY}px)`
    }, {
        duration: 200,
        fill: "forwards"
    });
    // const mouseX = event.clientX;
    // const mouseY = event.clientY;
    // cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

////// Cursor Events //////
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
}

let projectCards = document.querySelectorAll(".project-card");

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
for (let elem of h2Elems) {
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


///// NEW SCROLL EFFECT CODE /////
window.addEventListener("scroll", () => {

    // for (let elem of imgs) {
    console.log(elem.getBoundingClientRect().top);

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

    // elem.style.objectPosition = `50% ${30 - (20 * positionPercentage / 100)}%`; // From 30% to 10%
    // 30 is the starting position in CSS
    // 20 ist the total movement range
    // because of the minus in front of (20 * ...), the movement is upwards when scrolling down


    // const scrollDelta = parseFloat(elem.dataset.inviewScroll) - elem.getBoundingClientRect().top;
    // // console.log(scrollDelta);
    // const maxParallaxDelta = window.innerHeight; // Maximum parallax movement (20% of viewport height)

    // const percentage = (scrollDelta / maxParallaxDelta) * 100;
    // console.log(parseFloat(percentage) + "%");
    // const nextPercentageUnconstrained = parseFloat(elem.dataset.percentage) + percentage;
    // const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 100), 0);
    // // const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    // elem.dataset.percentage = nextPercentage;

    // elem.style.objectPosition = `${nextPercentage}% 50%`;
    // }


});
///// NEW SCROLL EFFECT CODE /////

//////////////////////////// OLD SCROLL EFFECT CODE ////////////////////////////
/*
window.addEventListener("scroll", () => {
    //console.log(window.scrollY);
    let scrollPosition = window.scrollY;
    let windowHeight = window.innerHeight;
    let scrollDelta = scrollPosition / windowHeight;



    h2Elems.forEach((h2) => {
        if (h2.classList.contains("inview")) {
            let elementsCurrentScroll = h2.dataset.scrollY;
            let scrolled = window.scrollY - elementsCurrentScroll;
            h2.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
});

// callback function to execute when entries are observed
function onEntry(entry) {
    entry.forEach((change) => {
        console.log(change);
        if (change.isIntersecting) {
            change.target.classList.add('inview');

            let currentScroll = window.scrollY;

            change.target.dataset.scrollY = currentScroll;
        } else {
            change.target.classList.remove('inview');
            change.target.style.transform = ``;

            change.target.dataset.scrollY = 0;
        }
    });
}

// list of options
let options = {
    root: null,
    threshold: 0.1,
    rootMargin: "10% 0% 10% 0%"
};

// instantiate a new Intersection Observer
let observer = new IntersectionObserver(onEntry, options);

// list of headings to be observed
let h2s = document.querySelectorAll('h2');

// loop through all h2s
// pass each element to observe method
// ES2015 for-of loop can traverse through DOM h2s
for (let elem of h2s) {
    observer.observe(elem);
}
*/
//////////////////////////// OLD SCROLL EFFECT CODE ////////////////////////////