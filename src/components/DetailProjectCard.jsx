import React from "react";

export default function DetailProjectCard ({project}) {
    return (
        <div className="grid grid-cols-1 border-solid border border-violet-600 bg-violet-500">
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
            <div className="text-center">
                    <a href={project.siteUrl} rel="noopener noreferrer" target="_blank">
                        <button className="border border-white bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 lg:px-2 m-1 rounded-full w-full md:w-2/5 lg:w-1/6">Sitio</button>
                    </a>
                    <a href={project.frontUrl} rel="noopener noreferrer" target="_blank">
                        <button className="border border-white bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 lg:px-2 m-1 rounded-full w-full md:w-2/5 lg:w-1/5">Repo Front</button>
                    </a>
                    <a href={project.backUrl} rel="noopener noreferrer" target="_blank">
                        <button className="border border-white bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 lg:px-2 m-1 rounded-full w-full md:w-2/5 lg:w-1/5">Repo Back</button>
                    </a>
                </div>
        </div>
    )
}