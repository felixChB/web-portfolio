import { ArrowIconWrapper } from "./SvgIcons";


export function ProjectCard({ title, year, tags, imageUrl, projectUrl }: { title: string, year: string, tags: string[], imageUrl: string, projectUrl: string }) {
    return (
        <a href={projectUrl} id="ui-verse-card" className="project-card">
            <div className="project-card-img-wrapper">
                <img src={imageUrl} alt={title + " project thumbnail"} />
            </div>
            <div className="project-card-details">
                <div className="project-card-infos">
                    <span className="project-card-year">{year}</span>
                    <span className="project-card-tags type-font">[{tags.join(", ")}]</span>
                </div>
                <span className="project-card-title">
                    <span>{title}</span>
                    <ArrowIconWrapper />
                </span>
            </div>
        </a>
    )
}