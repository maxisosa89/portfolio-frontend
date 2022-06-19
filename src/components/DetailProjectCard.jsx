import React from "react";

export default function DetailProjectCard ({project}) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 border-solid border border-violet-600 bg-violet-500">
            <h1>{project.projectTitle}</h1>
            {
                project.projectImg.map(img => (
                    <img src={img} alt="Not found" key={img}/>
                ))
            }
            <h3>Descripción</h3>
            <p>{project.projectDescription}</p>
            <h3>Tecnologías</h3>
            {
                project.tech.map(t => (
                    <div key={t.techTitle}>
                        <img src={t.techImg} alt="Not found" />
                        <p>{t.techTitle}</p>
                    </div>
                ))
            }
        </div>
    )
}