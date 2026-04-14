export function BurgerMenu() {
  return (
    <div id="burger-menu">
        <div className="close-menu-wrapper">
            <a className="close-menu-link nav-link" nav-section-value="close-menu">
                <span className="link-text">[Close]</span>
                <div className="close-icon-wrapper">
                    <svg className="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                        height="24">
                        <path d="M22 2L2 22M2 2l20 20" fill="none" stroke="currentColor" stroke-width="1"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </a>
        </div>
        <div className="menu-contact">
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
        <div className="menu-nav-wrapper">
            <ul className="menu-nav-links">
                <li><a className="menu-link nav-link" nav-section-value="home"><span className="link-text">Home</span></a>
                </li>
                <li><a className="menu-link nav-link" nav-section-value="about"><span className="link-text">About</span></a>
                </li>
                <li><a className="menu-link nav-link has-project-number" nav-section-value="projects"><span
                            className="link-text">Projects<span className="projects-number">[4]</span></span></a></li>
                <li><a className="menu-link nav-link" nav-section-value="contact"><span className="link-text">Contact</span></a>
                </li>
            </ul>
        </div>
        <div className="menu-bottom">
            <div className="menu-bottom-links">
                <span className="brackets-headline">[Connect]</span>
                <ul className="social-links">
                    <li><a href="https://github.com/felixChB" target="_blank" className="nav-link link"><span
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
                    <li><a href="https://www.linkedin.com/in/felix-brunn-0a32313a3/" target="_blank"
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
            <div className="legals">
                <span className="legal-info">© 2026</span>
                <span className="local-time">///</span>
            </div>
        </div>
    </div>
  );
}