import type { ProjectCardProps } from "../data/projects";
import { ArrowIconWrapper } from "./SvgIcons";


export function ProjectCard({ id, title, year, tags, thumbnail, url }: ProjectCardProps) {
    return (
        <a href={url} id={id + "-card"} className="project-card">
            <div className="project-card-img-wrapper">
                <img src={thumbnail} alt={title + " project thumbnail"} />
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