import { ArrowIconWrapper } from "./SvgIcons";

export function NavLinks({NavLinkText, HasArrow}: {NavLinkText: string; HasArrow: boolean}) {
    return (
        <a className="font-sans uppercase relative transition-(--hover-transition) flex items-center flex-row text-base leading-[1.1rem] overflow-hidden w-fit m-0 px-[0.15em] py-[0.25em]" data-nav-section={NavLinkText.toLowerCase()}>
            <span className="relative z-1 flex items-center">[{NavLinkText}]</span>
            {HasArrow && <ArrowIconWrapper />}
        </a>
    )
}