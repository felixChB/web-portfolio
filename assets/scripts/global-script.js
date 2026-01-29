// global html elements
export const bodyElem = document.querySelector("body");
export const mainElem = document.querySelector("main");
export const mainHeaderElem = document.getElementById("main-header");
export const burgerMenuElem = document.getElementById("burger-menu");
export const contactSectionElem = document.getElementById("contact");
export const cursorViewProjectElem = document.getElementById('cursor-view-project');
export const cursorImgElem = document.getElementById('cursor-img');

export const navLinks = document.querySelectorAll(".nav-link");
export const backToTopLink = document.querySelector(".back-to-top-wrapper");

// observer options for the white section element (index: projects, project: main)
export const whiteSectionElemOptions = { root: null, threshold: 0.0, rootMargin: "-40% 0% -20% 0%" };
export const slideInOptions = { root: null, threshold: 0.0, rootMargin: "10% 0% 0% 0%" };
export const appearTextOptions = { root: null, threshold: 0.0, rootMargin: "10% 0% -20% 0%" };

export const appearTextObserver = new IntersectionObserver(onSlideInEntry, appearTextOptions);

export function onPageLoad() {

    console.log("DOM fully loaded and parsed");
    console.log(window.location.pathname);

    // Start up stuff
    bodyElem.classList.add("page-loaded");

    // Update the clock immediately, then every 1 second
    updateLocalTime();
    setInterval(updateLocalTime, 1000);

    // 1. Check if a scroll target was passed via sessionStorage
    const pendingTarget = sessionStorage.getItem('pendingScrollTarget');

    if (pendingTarget) {
        // 2. Clear it immediately so a refresh doesn't trigger it again
        sessionStorage.removeItem('pendingScrollTarget');

        // 3. Perform the delayed scroll
        setTimeout(() => {
            scrollToSection(pendingTarget);
        }, 400);
    }
}

export function backToTopHandler() {
    backToTopLink.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToSection("top");
    });
}

export function toggleContactSectionVisibility() {
    // when main is scrolled up halfway through the window height past the contact section
    if (mainElem.getBoundingClientRect().bottom <= (window.innerHeight * 0.4)) {
        if (!contactSectionElem.classList.contains('inview')) {
            contactSectionElem.classList.add('inview');

            //scroll to the bottom when contact inview is triggered
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        }
    } else {
        if (contactSectionElem.classList.contains('inview')) {
            contactSectionElem.classList.remove('inview');
        }
    }
}

export function navLinksHandler() {
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const linkAttribute = link.getAttribute("nav-section-value");
            if (!linkAttribute) return;

            e.preventDefault();

            // 1. Handle UI Actions first (Menu Open/Close)
            if (linkAttribute === "open-menu" || linkAttribute === "close-menu") {
                handleUiAction(linkAttribute);
                return; // Stop here, don't try to scroll or navigate
            }

            // 2. Determine if we are on the Home Page
            // Check if the element exists OR if the pathname is basically the root
            const isHomePage = !!document.getElementById(linkAttribute) ||
                window.location.pathname === "/" ||
                window.location.pathname.endsWith("index.html");

            if (isHomePage && document.getElementById(linkAttribute)) {
                // We are on the home page and the section exists -> Scroll
                if (link.classList.contains("menu-link")) {
                    handleUiAction("close-menu");
                    setTimeout(() => scrollToSection(linkAttribute), 600);
                } else {
                    scrollToSection(linkAttribute);
                }
            } else {
                // 1. Save the target section to session storage
                sessionStorage.setItem('pendingScrollTarget', linkAttribute);

                // 2. Navigate to the clean home page URL
                window.location.href = window.location.origin + "/web-portfolio" + "/index.html";
            }
        });
    });
}

export function handleUiAction(action) {
    switch (action) {
        case "open-menu":
            burgerMenuElem.classList.add("open");
            bodyElem.classList.add("menu-open");
            break;
        case "close-menu":
            burgerMenuElem.classList.remove("open");
            bodyElem.classList.remove("menu-open");
            break;
    }
}

export function scrollToSection(sectionId) {
    let topPosition = 0;

    if (sectionId === "top") {
        topPosition = 0;
    } else if (sectionId === "contact") {
        topPosition = document.body.scrollHeight;
    } else {
        const element = document.getElementById(sectionId);
        if (element) {
            topPosition = element.offsetTop;
        } else {
            return; // Safety exit
        }
    }

    window.scrollTo({
        top: topPosition,
        behavior: "smooth"
    });
}

export function customCursorHandler(cursor, targets, smoothness = 300) {

    // 1. Only run logic if the device has a mouse (fine pointer)
    const hasMouse = window.matchMedia('(pointer: fine)').matches;

    if (hasMouse) {
        // 2. Update coordinates on mouse move
        window.addEventListener('mousemove', (e) => {

            cursor.animate({
                transform: `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
            }, {
                duration: smoothness,
                fill: "forwards"
            });
        });

        // 3. Show/Hide logic for specific elements
        targets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursor.classList.add('is-active');
            });

            target.addEventListener('mouseleave', () => {
                cursor.classList.remove('is-active');
            });
        });
    }
}

export function onSlideInEntry(entries) {
    entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            el.classList.add('inview');

            // If element is a video, attempt to play when it comes into view
            if (el.tagName === 'VIDEO') {
                try {
                    // Ensure muted so autoplay is allowed by browsers
                    if (!el.muted) el.muted = true;
                    const p = el.play();
                    if (p && p.catch) p.catch(() => { /* ignore play rejection */ });
                } catch (e) {
                    /* ignore */
                }
            }
        } else {
            if (entry.boundingClientRect.top > 0) {
                el.classList.remove('inview');

                // Pause video when it leaves view
                if (el.tagName === 'VIDEO') {
                    try {
                        if (!el.paused) el.pause();
                        el.currentTime = 0;
                    } catch (e) { /* ignore */ }
                }
            }
        }
    });
}

// split text content of an element into lines wrapped in divs for line-by-line animation
// gemini made
export function splitTextIntoLines(container) {
    // Save original text on first run to prevent losing words on repeated resizes
    if (!container.dataset.originalText) {
        container.dataset.originalText = container.innerText;
    }

    const originalText = container.dataset.originalText;
    container.innerHTML = ''; // Clear for rebuild

    // Step 1: Wrap words in temporary spans to measure their Y-position
    const words = originalText.split(' ');
    words.forEach(word => {
        const span = document.createElement('span');
        // if (word.) {
        // insert code here to get the last word element to not add &nbsp;
        // }
        span.innerHTML = word + '&nbsp;';
        span.style.display = 'inline-block';
        container.appendChild(span);
    });

    // Step 2: Group words into lines based on their vertical offset
    const lines = [];
    let currentLine = [];
    let lastOffset = -1;

    const wordSpans = container.querySelectorAll('span');
    wordSpans.forEach(span => {
        if (span.offsetTop !== lastOffset) {
            // console.log(span.offsetTop, lastOffset);
            if (currentLine.length > 0) lines.push(currentLine);
            currentLine = [];
            lastOffset = span.offsetTop;
        }
        currentLine.push(span.innerText);
    });

    if (currentLine.length > 0) lines.push(currentLine);

    // Step 3: Rebuild the HTML with your specific classes
    container.innerHTML = ''; // Clear temp spans
    lines.forEach((lineText, index) => {
        const lineMask = document.createElement('div');
        lineMask.classList.add('appear-text-line');
        lineMask.style.transitionDelay = `${index * 0.07}s`;

        for (let i = 0; i < lineText.length; i++) {
            const span = document.createElement('span');
            span.innerHTML = lineText[i];
            span.classList.add('appear-text-word');
            // span.style.transitionDelay = `${index * 0.1}s`;
            lineMask.appendChild(span);
        }

        container.appendChild(lineMask);
    });
}

export function updateLocalTime() {
    const now = new Date();

    // Options to format the date according to the Germany timezone
    const options = {
        timeZone: 'Europe/Berlin',
        weekday: 'long',   // e.g., "Friday"
        hour: '2-digit',   // e.g., "11"
        minute: '2-digit', // e.g., "00"
        second: '2-digit', // e.g., "05"
        hour12: false      // Use 24-hour format (standard in Germany)
    };

    // Create the formatter
    const formatter = new Intl.DateTimeFormat('en-GB', options);

    // Get the formatted parts
    const parts = formatter.formatToParts(now);
    const timeValues = {};
    parts.forEach(({ type, value }) => timeValues[type] = value);

    // Build the string: "Friday 11:00:05 GER"
    // Note: We manually add "GER" or "BER" to match the style of your example site
    const timeString = `${timeValues.weekday} ${timeValues.hour}:${timeValues.minute}:${timeValues.second} GER`;

    document.querySelectorAll('.local-time').forEach(elem => {
        elem.textContent = timeString;
    });
}