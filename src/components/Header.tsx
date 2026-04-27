export function Header() {
    return (
        <header id="main-header" className="h-(--header-height) w-full flex justify-between items-center bg-transparent transition-all duration-300 ease-[ease] mix-blend-difference text-page-white m-0">
            <Logo />
            <MainNav />
            <BurgerNav />
        </header>
    )
}

function Logo() {
    return (
        <span id="logo">
            <a href="/web-portfolio/">
                <p>// Felix´</p>
                <p>Portfolio</p>
            </a>
        </span>
    )
}

function MainNav() {
    return (
        <nav id="main-nav" className="text-nav">
            <ul>
                <li><a className="nav-link" data-nav-section="about"><span className="link-text">[About]</span></a></li>
                <li><a className="nav-link" data-nav-section="projects"><span className="link-text">[Projects]</span></a></li>
                <li><a className="nav-link" data-nav-section="contact"><span className="link-text">[Contact]</span></a></li>
            </ul>
        </nav>
    )
}

function BurgerNav() {
    return (
        <nav className="burger-nav">
            <a className="open-menu-link nav-link" nav-section-value="open-menu">
                <div className="burger-icon-wrapper">
                    <div className="burger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="burger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <span className="link-text">[Menu]</span>
            </a>
        </nav>
    )
}