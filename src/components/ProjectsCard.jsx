import React from "react";
import { NavLink } from "react-router-dom";
import Carousel from "./Carousel";

export default function ProjectsCard ({project}) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:h-96 bg-secondary shadow-md shadow-primary">
            <Carousel project={project} heightCarousel={"h-96"}/>
            <div className="grid grid-cols-1 p-10 lg:col-span-2">
                <h2 className="text-3xl uppercase m-1 text-white font-bold text-center">{project.projectTitle}</h2>
                <p className="text-base m-1 my-5 text-white text-justify">{project.projectSummary}</p>
                <div className="text-center self-end">
                    <NavLink to={`/projects/${project.id}`}>
                        <button className="border border-white bg-secondary hover:bg-tertiary text-white font-semibold py-2 px-4 lg:px-2 m-1 rounded-full w-full md:w-2/5 lg:w-1/5">Detalles</button>
                    </NavLink>
                    <a href={project.siteUrl} rel="noopener noreferrer" target="_blank">
                        <button className="border border-white bg-secondary hover:bg-tertiary text-white font-semibold py-2 px-4 lg:px-2 m-1 rounded-full w-full md:w-2/5 lg:w-1/6">Sitio</button>
                    </a>
                    <a href={project.frontUrl} rel="noopener noreferrer" target="_blank">
                        <button className="border border-white bg-secondary hover:bg-tertiary text-white font-semibold py-2 px-4 lg:px-2 m-1 rounded-full w-full md:w-2/5 lg:w-1/5">Repo Front</button>
                    </a>
                    <a href={project.backUrl} rel="noopener noreferrer" target="_blank">
                        <button className="border border-white bg-secondary hover:bg-tertiary text-white font-semibold py-2 px-4 lg:px-2 m-1 rounded-full w-full md:w-2/5 lg:w-1/5">Repo Back</button>
                    </a>
                </div>
            </div>
        </div>
    )
}