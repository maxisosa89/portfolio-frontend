import React from "react";
export default function ProjectsCardAdmin({ project }) {
    return (
        <div>
            <hr className="my-1 mx-5 border border-gray-400" />
            <div className="flex flex-wrap my-2 mx-7 md:h-64">
                <img
                    src={project.projectImg[0]}
                    alt="Imagen no disponible"
                    className="w-full md:w-5/12 h-48 md:h-64 object-cover"
                />
                <div className="w-full md:w-6/12 text-4xl p-5 text-center self-center">
                    <p className="break-all">{project.projectTitle}</p>
                </div>
                <div className="w-full md:w-1/12 self-center">
                    <div className="flex md:inline justify-center">
                        <img
                            src="https://res.cloudinary.com/dg7fmdsmw/image/upload/v1656060522/Portfolio/iconos/edit_hjowes.png"
                            alt="Editar"
                            className="h-16 mx-2 md:my-2 border-4 border-blue-900 rounded cursor-pointer hover:bg-blue-500"
                            onClick={e => console.log("editar")}
                        />
                        <img
                            src="https://res.cloudinary.com/dg7fmdsmw/image/upload/v1656060758/Portfolio/iconos/delete_g3pwe2.png"
                            alt="Eliminar"
                            className="h-16 mx-2 md:my-2 border-4 border-red-900 rounded cursor-pointer hover:bg-red-500"
                            onClick={e => console.log("borrar")}
                        />
                    </div>
                </div>
            </div>
            <hr className="my-2 mx-5 border border-gray-400" />
        </div>)
}