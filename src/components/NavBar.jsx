import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function NavBar () {
    const location = useLocation().pathname;
    function handleToggle() {
        window.innerWidth < 1024 && document.getElementById("containerData").classList.toggle("hidden");
    }
    return (
        <nav className="flex items-center justify-between flex-wrap z-50 bg-primary p-6 fixed w-full">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">LOGO</span>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-tertiary hover:border-tertiary" onClick={handleToggle}>
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden" id="containerData">
                <div className="text-sm lg:flex-grow">
                    <NavLink to='/about' onClick={handleToggle} value="about">
                        <p className={`block mt-4 lg:inline-block lg:mt-0 text-white hover:text-tertiary mr-4 ${location.includes("about") && 'text-tertiary'}`}>
                            Sobre mí
                        </p>
                    </NavLink>
                    <NavLink to='/projects' onClick={handleToggle} value="projects">
                        <p className={`block mt-4 lg:inline-block lg:mt-0 text-white hover:text-tertiary mr-4 ${location.includes("projects") && 'text-tertiary'}`}>
                            Mis Proyectos
                        </p>
                    </NavLink>
                    <NavLink to='/skills' onClick={handleToggle} value="skils">
                        <p className={`block mt-4 lg:inline-block lg:mt-0 text-white hover:text-tertiary mr-4 ${location.includes("skills") && 'text-tertiary'}`}>
                            Skills
                        </p>
                    </NavLink>
                    <NavLink to='/contact' onClick={handleToggle} value="contact">
                        <p className={`block mt-4 lg:inline-block lg:mt-0 text-white hover:text-tertiary mr-4 ${location.includes("contact") && 'text-tertiary'}`}>
                            Contacto
                        </p>
                    </NavLink>
                    <NavLink to='/admin/dashboard' onClick={handleToggle} value="adminDashboard">
                        <p className={`block mt-4 lg:inline-block lg:mt-0 text-white hover:text-tertiary mr-4 ${location.includes("admin") && 'text-tertiary'}`}>
                            Admin
                        </p>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}