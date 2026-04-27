export function H1({h1Text}: {h1Text: string}) {
    return (
        <h1 className="home-headline">
            <span className="headline-text text-page-white">{h1Text}</span>
        </h1>
    )
}

export function H2({h2Text}: {h2Text: string}) {
    return (
        <h2 className="projects-headline">
            <span className="headline-text">{h2Text}</span>
          </h2>
    )
}

export function BracketsHeadline({BracketsHeadlineText}: {BracketsHeadlineText: string}) {
    return (
        <span className="block font-mono font-weight-normal uppercase text-page-grey mb-[4px] -ml-px">[{BracketsHeadlineText}]</span>
    )
}