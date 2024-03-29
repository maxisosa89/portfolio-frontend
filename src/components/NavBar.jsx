import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function NavBar() {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  function handleToggle() {
    window.innerWidth < 1024 && document.getElementById("containerData").classList.toggle("hidden");
  }
  document.addEventListener('click', function (event) {
    if (event.target.id !== 'containerData' && event.target.id !== "btn" && event.target.id !== "svg" && window.innerWidth < 1024) {
      document.getElementById('containerData').classList.add("hidden");
    }
  });
  window.addEventListener('storage', function(e) {
    getToken();
  });
  function handleLogout(e) {
    e.preventDefault();
    setAuth(false);
    localStorage.removeItem("tokenPortfolioMS");
    navigate('/');
  };
  function getToken() {
    try {
      const token = localStorage.getItem("tokenPortfolioMS");
      const decoded = jwt_decode(token);
      const current_time = new Date().getTime() / 1000;
	    if (current_time > decoded.exp) {
        setAuth(false);
      } else {
        setAuth(true);
      }
    } catch(e){
      setAuth(false);
    }
  };
  useEffect(() => {
    getToken();
}, []);
  return (
    <nav className="flex items-center justify-between flex-wrap z-50 bg-primary fixed px-6 w-full shadow-sm shadow-white">
      <div className="flex items-center flex-shrink-0 text-white mr-6 my-6">
        <span className="font-semibold text-xl tracking-tight">LOGO</span>
      </div>
      <div className="block lg:hidden">
        <button id="btn" className="h-8 w-8 border rounded text-white border-white hover:text-tertiary hover:border-tertiary" onClick={handleToggle}>
          ☰
        </button>
      </div>
      <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden" id="containerData">
        <div className="text-sm lg:flex-grow">
          <NavLink to='/' onClick={handleToggle} value="home">
            <p className={`block mt-4 lg:inline-block lg:mt-0 text-white hover:text-tertiary mr-4 font-calibri text-lg ${location === "/" && 'text-tertiary'}`}>
              Home
            </p>
          </NavLink>
          <NavLink to='/projects' onClick={handleToggle} value="projects">
            <p className={`block mt-4 lg:inline-block lg:mt-0 text-white hover:text-tertiary mr-4 font-calibri text-lg ${location.includes("projects") && !location.includes("admin") && 'text-tertiary'}`}>
              Mis Proyectos
            </p>
          </NavLink>
          <NavLink to='/about' onClick={handleToggle} value="skils">
            <p className={`block mt-4 lg:inline-block lg:mt-0 text-white hover:text-tertiary mr-4 font-calibri text-lg ${location.includes("about") && !location.includes("admin") && 'text-tertiary'}`}>
              Sobre mí
            </p>
          </NavLink>
          <NavLink to='/contact' onClick={handleToggle} value="contact">
            <p className={`block mt-4 lg:inline-block lg:mt-0 text-white hover:text-tertiary mr-4 font-calibri text-lg ${location.includes("contact") && !location.includes("admin") && 'text-tertiary'}`}>
              Contacto
            </p>
          </NavLink>
          <NavLink to='/admin/dashboard' onClick={handleToggle} value="adminDashboard">
            <p className={`mt-4 lg:mt-0 text-white hover:text-tertiary mr-4 font-calibri text-lg ${location.includes("admin") && 'text-tertiary'} ${auth ? 'block lg:inline-block' : 'hidden'}`}>
              Admin
            </p>
          </NavLink>
            <p
              onClick={handleLogout}
              className={`mt-4 lg:mt-0 text-white hover:text-tertiary mr-4 cursor-pointer font-calibri text-lg ${auth ? 'block lg:inline-block' : 'hidden'}`}>
              Cerrar Sesión
            </p>
        </div>
      </div>
    </nav>
  )
}