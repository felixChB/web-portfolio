import { globalVariables } from "../global-variables";

export function Footer() {
    return (
        <footer id="contact">
            <div className="get-in-touch-wrapper">
                <h2 className="contact-headline">
                    <span className="headline-text">Get in Touch</span>
                </h2>
                <div className="email-link-wrapper">
                    <span className="brackets-headline">[Contact me]</span>
                    <a href="mailto:Lix.brunn@gmail.com" className="email-link nav-link link">
                        <span className="link-text">Lix.brunn@gmail.com</span>
                        <div className="arrow-icon-wrapper">
                            <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                height="24">
                                <path d="M2 2h20M22 22v-20M2 22L22 2" fill="none" stroke="currentColor" stroke-width="1"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                height="24">
                                <path d="M2 2h20M22 22v-20M2 22L22 2" fill="none" stroke="currentColor" stroke-width="1"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
            <div className="contact-bottom-wrapper">
                <nav className="contact-left">
                    <Sitemap />
                    <SocialLinks />
                </nav>
                <div className="contact-right">
                    <a className="back-to-top-wrapper">
                        <div className="arrow-icon-wrapper">
                            <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                height="24">
                                <path d="M2 2h20M22 22v-20M2 22L22 2" fill="none" stroke="currentColor" stroke-width="1"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                height="24">
                                <path d="M2 2h20M22 22v-20M2 22L22 2" fill="none" stroke="currentColor" stroke-width="1"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <span className="back-to-top-text nav-link"><span className="link-text">[Back to Top]</span>
                        </span>
                    </a>
                </div>
            </div>
            <Legals />
        </footer>
    )
}

export function Legals() {
    return (
        <div className="legals">
            <span className="legal-info">© 2026</span>
            <span className="local-time">///</span>
        </div>
    )
}

export function Sitemap() {
    return (
        <div className="sitemap-wrapper">
            <span className="brackets-headline">[Navigation]</span>
            <ul className="sitemap">
                <li><a nav-section-value="home" className="nav-link"><span className="link-text">Home</span></a>
                </li>
                <li><a nav-section-value="about" className="nav-link"><span className="link-text">About</span></a>
                </li>
                <li><a nav-section-value="projects" className="nav-link"><span className="link-text">Projects</span></a>
                </li>
                <li><a nav-section-value="contact" className="nav-link"><span className="link-text">Contact</span></a>
                </li>
            </ul>
        </div>
    )
}

export function SocialLinks() {
    return (
        <div className="social-links-wrapper">
            <span className="brackets-headline">[Connect]</span>
            <ul className="social-links">
                <li><a href={globalVariables.githubUrl} target="_blank" className="nav-link link"><span
                    className="link-text">Github</span>
                    <div className="arrow-icon-wrapper">
                        <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            width="24" height="24">
                            <path d="M2 2h20M22 22v-20M2 22L22 2" fill="none" stroke="currentColor"
                                stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            width="24" height="24">
                            <path d="M2 2h20M22 22v-20M2 22L22 2" fill="none" stroke="currentColor"
                                stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </a></li>
                <li><a href={globalVariables.linkedinUrl} target="_blank"
                    className="nav-link link"><span className="link-text">LinkedIn</span>
                    <div className="arrow-icon-wrapper">
                        <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            width="24" height="24">
                            <path d="M2 2h20M22 22v-20M2 22L22 2" fill="none" stroke="currentColor"
                                stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            width="24" height="24">
                            <path d="M2 2h20M22 22v-20M2 22L22 2" fill="none" stroke="currentColor"
                                stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </a></li>
            </ul>
        </div>
    )
}