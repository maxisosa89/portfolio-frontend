import React from "react";

export default function ProjectsCard ({project}) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 border-solid border border-violet-600 bg-violet-500">
            <div className="h-full">
                <img className="h-full object-cover" src={project.projectImg[0]} alt="not found" />
            </div>
            <div className="p-10 lg:col-span-2">
                <h2 className="text-3xl uppercase m-1 text-white font-bold text-center">{project.projectTitle}</h2>
                <p className="text-base m-1 my-5 text-white text-justify">{project.projectSummary}</p>
                <div className="text-center">
                    <button className="border border-white bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 m-1 rounded-full w-full md:w-2/5 lg:w-1/5">Detalles</button>
                    <button className="border border-white bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 m-1 rounded-full w-full md:w-2/5 lg:w-1/5">Sitio</button>
                    <button className="border border-white bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 m-1 rounded-full w-full md:w-2/5 lg:w-1/5">Repo Front</button>
                    <button className="border border-white bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 m-1 rounded-full w-full md:w-2/5 lg:w-1/5">Repo Back</button>
                </div>
            </div>
        </div>
    )
}