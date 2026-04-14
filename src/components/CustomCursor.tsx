import { ArrowIconWrapper } from "./SvgIcons"

export function TextCursor() {
    return (
        <div id="cursor-view-project" className="cursor">
            <div className="cursor-wrapper">
                <span className="cursor-view-project view-project">
                    <span className="cursor-text view-project-text">[View project]</span>
                    <ArrowIconWrapper />
                </span>
            </div>
        </div>
    )
}

export function ImageCursor(imageUrl: string) {
    return (
        <div id="cursor-img" className="cursor">
            <div className="cursor-wrapper">
                <div className="cursor-img-wrapper">
                    <img className="cursor-img" src={imageUrl} alt=""/>
                </div>
            </div>
        </div>
    )
}