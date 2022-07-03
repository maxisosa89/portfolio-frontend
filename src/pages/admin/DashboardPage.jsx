import React from "react";
import { NavLink } from "react-router-dom";

export default function DashboardPage () {
    return (
        <div className="flex flex-wrap justify-center container mx-auto bg-tertiary pt-24">
            <div className="w-full sm:w-40">
                <p className="text-white font-semibold text-2xl text-center">Mensajes</p>
                <div className="flex justify-center">
                    <NavLink to="/admin/messages">
                        <button
                            className="w-28 h-28 m-2 border border-white bg-secondary hover:bg-tertiary text-white font-semibold text-2xl rounded-full"
                        >
                            {'5/20'}
                        </button>
                    </NavLink>
                </div>
            </div>
            <div className="w-full sm:w-40">
                <p className="text-white font-semibold text-2xl text-center">Proyectos</p>
                <div className="flex justify-center">
                    <NavLink to="/admin/projects">
                        <button
                            className="w-28 h-28 m-2 border border-white bg-secondary hover:bg-tertiary text-white font-semibold text-2xl rounded-full"
                        >
                            {'10'}
                        </button>
                    </NavLink>
                </div>
            </div>
            <div className="w-full sm:w-40">
                <p className="text-white font-semibold text-2xl text-center">Techs</p>
                <div className="flex justify-center">
                    <NavLink to="/admin/techs">
                        <button
                            className="w-28 h-28 m-2 border border-white bg-secondary hover:bg-tertiary text-white font-semibold text-2xl rounded-full"
                        >
                            {'10'}
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}