import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

export default function AboutPage() {
  const [about, setAbout] = useState();
  const [techs, setTechs] = useState();
  const [loading, setLoading] = useState(true);
  async function getAboutData() {
    const aboutData = await axios.get("/about");
    aboutData.data.length && setAbout(aboutData.data[0]);
    const techsData = await axios.get("/techs");
    aboutData.data.length && setTechs(techsData.data);
    setLoading(false);
  };
  useEffect(() => {
    getAboutData();
  }, []);
  return (
    <div className="flex justify-center h-screen container mx-auto bg-tertiary py-24">
    {
      loading ?
      <div className="fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2">
        <Spinner />
      </div> :
      <div className="border bg-secondary m-auto text-white mx-auto md:mx-6 lg:mx-12 p-2 md:p-6 lg:p-12">
        <div className="m-1 sm:m-5">
          <h1 className="text-5xl">Habilidades</h1>
          <p>
            {about?.description}
          </p>
        </div>
        <div className="m-1 sm:m-5 flex flex-wrap text-center">
          <div className=" w-full sm:w-1/2">
            <h3>Hard skills:</h3>
            <ul>
              {
                techs?.map(t => (
                  <li key={t.id}>
                    <div key={t.techTitle} className="flex text-base text-white ml-5">
                      <img src={t.techImg} alt="Not found" 
                      className="h-5 w-5" />
                      <p className="ml-2">{t.techTitle}</p>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className=" w-full sm:w-1/2">
            <h3>Soft skills:</h3>
            <ul>
              {
                about?.softSkills?.map((s, index) => (
                  <li key={`${s}-${index}`}>{s}</li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className="m-1 sm:m-5">
            <h3>Sub Habilidades:</h3>
            <ul>
                {
                  about?.subSkills?.map((s, index) => (
                    <li key={`${s}-${index}`}>{s}</li>
                  ))
                }
            </ul>
        </div>
        <div className="flex flex-wrap justify-center items-center">
            {
              about?.files?.map(f => (
                <div key={f.url} className="relative mx-auto my-2 opacity-80 hover:opacity-100">
                  <a href={f.url} rel="noopener noreferrer" target="_blank">
                    <img
                      src={f.url.slice(0, -3)+"jpg"}
                      alt="Not Found"
                      width={f.width}
                      className="max-w-[250px]"
                    />
                    <span className="absolute flex bottom-1/2 w-full h-10 bg-tertiary justify-center opacity-80">
                      <img
                        src="https://res.cloudinary.com/dg7fmdsmw/image/upload/v1659617800/Portfolio/iconos/icons8-eye-30_fqafwg.png"
                        alt="Not Found"
                        className="h-full"
                      />
                    </span>
                  </a>
                </div>
              ))
            }
        </div>
      </div>
    }
    </div>
  )
}