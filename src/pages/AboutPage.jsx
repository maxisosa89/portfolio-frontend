import React from "react";
import { NavLink } from "react-router-dom";

export default function AboutPage () {
    return (
        <div className="flex justify-center h-screen container mx-auto bg-tertiary py-24">
            <div className="border bg-secondary m-auto text-white mx-2 md:mx-6 lg:mx-12 p-2 md:p-6 lg:p-12">
                <h1 className="text-5xl m-5">Hola! Soy Maxi, Fullstack Developer</h1>
                <h3 className="text-3xl m-5">Desarrollo web</h3>
                <p className="m-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae rerum asperiores voluptas dolorem excepturi blanditiis suscipit amet voluptatibus repellendus iste!</p>
                <div className="text-center self-end m-3">
                    <NavLink to="/projects">
                        <button
                            className="border border-white bg-secondary hover:bg-tertiary text-white font-semibold py-2 px-4 lg:px-2 m-1 rounded-full w-full md:w-2/5 lg:w-1/5"
                        >
                                Proyectos
                        </button>
                    </NavLink>
                    <NavLink to="/skills">
                        <button
                            className="border border-white bg-secondary hover:bg-tertiary text-white font-semibold py-2 px-4 lg:px-2 m-1 rounded-full w-full md:w-2/5 lg:w-1/6"
                        >
                                Skills
                        </button>
                    </NavLink>
                    <NavLink to="/contact">
                        <button
                            className="border border-white bg-secondary hover:bg-tertiary text-white font-semibold py-2 px-4 lg:px-2 m-1 rounded-full w-full md:w-2/5 lg:w-1/5"
                        >
                                Contacto
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}