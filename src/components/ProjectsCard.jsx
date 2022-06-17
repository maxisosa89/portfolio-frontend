import React from "react";

export default function ProjectsCard ({project}) {
    return (
        <div>
            <img src={project.projectImg[0]} alt="not found" />
            <h3>{project.projectTitle}</h3>
            <p>{project.projectSummary}</p>
            <p>{project.siteUrl}</p>
            <p>{project.frontUrl}</p>
            <p>{project.backUrl}</p>
        </div>
    )
}