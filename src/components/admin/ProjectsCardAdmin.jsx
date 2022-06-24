import React from "react";
export default function ProjectsCardAdmin({ project }) {
    return (
        <div>
            <hr className="my-1 mx-5 border border-gray-400" />
            <div className="flex mx-8">
                <div className="w-3/5 h-32 lg:h-64 mx-2 mt-0.5 text-xl md:text-2xl lg:text-4xl flex">
                    <p className="w-full text-center self-center break-words">{project.projectTitle}</p>
                </div>
                <div className="w-2/5 h-32 lg:h-64 py-2 px-0 flex ">
                    <img
                        src={project.projectImg[0]}
                        alt="Imagen no disponible"
                        className="w-10/12 h-full object-cover"
                    />
                    <div className="w-2/12 mt-4 lg:mt-8">
                        <img
                            src="https://res.cloudinary.com/dg7fmdsmw/image/upload/v1656060522/Portfolio/iconos/edit_hjowes.png"
                            alt="Editar"
                            className="relative inset-x-2 inset-y-px w-7 h-7 md:w-11 md:h-11"
                        />
                        <img
                            src="https://res.cloudinary.com/dg7fmdsmw/image/upload/v1656060758/Portfolio/iconos/delete_g3pwe2.png"
                            alt="Eliminar"
                            className="relative inset-x-2 inset-y-px w-7 h-7 md:w-11 md:h-11"
                        />
                    </div>
                </div>
            </div>
            <hr className="my-2 mx-5 border border-gray-400" />
        </div>)
}