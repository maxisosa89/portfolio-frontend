import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { NavLink } from "react-router-dom";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [homePageData, setHomePageData] = useState({
    homeTitle: "",
    homeSubTitle: "",
    homeSummary: ""
  });
  async function getHomePageData() {
    const homeData = await axios.get("/home");
    homeData.data.length && setHomePageData(homeData.data[0]);
    setLoading(false);
  };
  useEffect(() => {
    getHomePageData();
  }, []);
  return (
    <div className="flex justify-center h-screen container mx-auto bg-tertiary py-24">
      {
        loading ?
        <div className="fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div> :
        <div className="border bg-secondary m-auto text-white mx-2 md:mx-6 lg:mx-12 p-2 md:p-6 lg:p-12 min-w-full md:min-w-[600px]">
          <h1 className="text-5xl m-5">
            {homePageData.homeTitle || "Título"}
          </h1>
          <h3 className="text-3xl m-5">{homePageData.homeSubTitle || "Subtítulo"}</h3>
          <p className="m-5">{homePageData.homeSummary || "Resumen"}</p>
          <div className="text-center self-end m-3">
            <NavLink to="/projects">
              <button
                className="border border-white bg-secondary hover:bg-tertiary text-white font-semibold py-2 px-4 lg:px-2 m-1 mx-auto sm:mx-1 rounded-full w-full md:w-2/5 lg:w-1/5"
              >
                Proyectos
              </button>
            </NavLink>
            <NavLink to="/about">
              <button
                className="border border-white bg-secondary hover:bg-tertiary text-white font-semibold py-2 px-4 lg:px-2 m-1 mx-auto sm:mx-1 rounded-full w-full md:w-2/5 lg:w-1/5"
              >
                Sobre mí
              </button>
            </NavLink>
            <NavLink to="/contact">
              <button
                className="border border-white bg-secondary hover:bg-tertiary text-white font-semibold py-2 px-4 lg:px-2 m-1 mx-auto sm:mx-1 rounded-full w-full md:w-2/5 lg:w-1/5"
              >
                Contacto
              </button>
            </NavLink>
          </div>
        </div>
      }
    </div>
  )
}