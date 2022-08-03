import axios from "axios";
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function HomePageForm({ homePageData, setHomePageData, token }) {
  const navigate = useNavigate();
  function handleChange(e) {
    setHomePageData({
      ...homePageData,
      [e.target.id]: e.target.value
    })
  };
  async function handleSubmit(e) {
    e.preventDefault();
    homePageData.id ?
    await axios.put(`/home/${homePageData.id}`, homePageData, { headers: { Authorization: token } }) :
    await axios.post("/home", homePageData, { headers: { Authorization: token } });
    navigate('/admin/dashboard');
  };
  return (
    <div className={`w-full max-w-[400px] z-40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary border border-white rounded py-3 px-4`}>
      <form className="flex flex-wrap justify-center">
        <div className="flex flex-wrap justify-center w-full">
          <input
            id="homeTitle"
            type="text"
            value={homePageData.homeTitle}
            onChange={handleChange}
            placeholder="Título"
            className="appearance-none focus:outline-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 m-2 leading-tight"
          />
          <input
            id="homeSubTitle"
            type="text"
            value={homePageData.homeSubTitle}
            onChange={handleChange}
            placeholder="Subtítulo"
            className="appearance-none focus:outline-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 m-2 leading-tight"
          />
          <input
            id="homeSummary"
            type="text"
            value={homePageData.homeSummary}
            onChange={handleChange}
            placeholder="Resumen"
            className="appearance-none focus:outline-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 m-2 leading-tight"
          />
        </div>
        <div className="flex justify-center w-full text-white">
          <button
            className={`border border-white rounded px-4 py-2 m-2 hover:bg-tertiary`}
            id="postBtn"
            onClick={handleSubmit}
          >
            Guardar
          </button>
          <NavLink to="/admin/dashboard">
            <button
              className="border border-white rounded px-4 py-2 m-2 hover:bg-tertiary"
              id="closeBtn"
            >
              Cancelar
            </button>
          </NavLink>
        </div>
      </form>
    </div>)
}