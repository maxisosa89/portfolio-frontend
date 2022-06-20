import React from "react";
import Carousel from './Carousel'

export default function DetailProjectCard ({project}) {
    return (
        <div className="grid grid-cols-1 mt-10 md:p-10 md:m-10 border-solid bg-secondary">
            <h1 className="mb-7 text-4xl text-center text-white font-bold uppercase">{project.projectTitle}</h1>
            <Carousel project={project}/>
            <div className="m-5 mt-10 text-2xl text-white font-bold">
                <h3>Descripción</h3>
            </div>
            <div className="text-base text-justify text-white m-5">
                <p>{project.projectDescription}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div>
                    <div className="m-5 text-2xl text-white font-bold">
                        <h3>Características</h3>
                    </div>
                    {
                        project.projectFunctions.map(f => (
                            <div key={f} className="text-base text-white ml-5">
                                <p>{f}</p>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <div className="m-5 text-2xl text-white font-bold">
                        <h3>Tecnologías</h3>
                    </div>
                    {
                        project.tech.map(t => (
                            <div key={t.techTitle} className="flex text-base text-white ml-5">
                                <img src={t.techImg} alt="Not found" 
                                className="h-5 w-5" />
                                <p className="ml-2">{t.techTitle}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="text-center mt-5 grid grid-cols-1 md:grid-cols-3">
                    <a href={project.siteUrl} rel="noopener noreferrer" target="_blank">
                        <button className="border border-white bg-secondary hover:bg-tertiary text-white font-semibold py-2 px-4 lg:px-2 m-1 rounded-full w-40">Sitio</button>
                    </a>
                    <a href={project.frontUrl} rel="noopener noreferrer" target="_blank">
                        <button className="border border-white bg-secondary hover:bg-tertiary text-white font-semibold py-2 px-4 lg:px-2 m-1 rounded-full w-40">Repo Front</button>
                    </a>
                    <a href={project.backUrl} rel="noopener noreferrer" target="_blank">
                        <button className="border border-white bg-secondary hover:bg-tertiary text-white font-semibold py-2 px-4 lg:px-2 m-1 rounded-full w-40">Repo Back</button>
                    </a>
            </div>
        </div>
    )
}