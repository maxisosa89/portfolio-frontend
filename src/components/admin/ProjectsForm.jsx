import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
export default function ProjectsForm({ projectForm, setProjectForm, open = false, handleForm, handleSubmit, errors, setErrors, newFunction, setNewFunction, techs, setTechs }) {
  const [loading, setLoading] = useState(false);
  const [techsFilter, setTechFilter] = useState(techs);
  const [techAdd, setTechAdd] = useState();
  async function uploadImage(e) {
    try {
      document.getElementById("inputImg").setAttribute("disabled", "");
      document.getElementById("labelInputImg")?.classList?.remove("hover:bg-secondary");
      document.getElementById("labelInputImg")?.classList?.remove("cursor-pointer");
      setLoading(true);
      const files = e.target.files;
      if (files[0]?.type?.includes("image")) {
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "Portfolio");
        const res = await axios.post("https://api.cloudinary.com/v1_1/dg7fmdsmw/image/upload", data);
        setProjectForm({
          ...projectForm,
          projectImg: [...projectForm.projectImg, res.data.url]
        });
        setErrors({
          ...errors,
          fileImg: undefined
        });
      } else if (files[0]?.type) {
        setErrors({
          ...errors,
          fileImg: "Formato de imagen inválido."
        });
      }
      document.getElementById("inputImg").removeAttribute("disabled");
      document.getElementById("labelInputImg")?.classList?.add("hover:bg-secondary");
      document.getElementById("labelInputImg")?.classList?.add("cursor-pointer");
      setLoading(false);
    } catch (err) {
      console.log("err: ", err);
      e.target.value = null;
      setProjectForm({
        ...projectForm,
        projectImg: []
      });
      setErrors({
        ...errors,
        fileImg: "Formato de imagen inválido."
      });
      document.getElementById("inputImg").removeAttribute("disabled");
      document.getElementById("labelInputImg")?.classList?.add("hover:bg-secondary");
      document.getElementById("labelInputImg")?.classList?.add("cursor-pointer");
      setLoading(false);
    }
  };
  function handleChange(e) {
    if (!e.target.id.includes("function")) {
      setProjectForm({
        ...projectForm,
        [e.target.id]: e.target.value
      });
    } else {
      setProjectForm({
        ...projectForm,
        projectFunctions: [...projectForm.projectFunctions, e.target.value]
      });
    }
  };
  function handleDeleteImage(e) {
    e.preventDefault();
    setProjectForm({
      ...projectForm,
      projectImg: projectForm.projectImg.filter(el => el !== e.target.value)
    });
  };
  function handleDeleteFunction(e) {
    e.preventDefault();
    setProjectForm({
      ...projectForm,
      projectFunctions: projectForm.projectFunctions.filter(el => el !== e.target.value)
    });
  };
  function handleChangeNewFunction(e) {
    setNewFunction(e.target.value);
  };
  function handleAddFunction(e) {
    e.preventDefault();
    setProjectForm({
      ...projectForm,
      projectFunctions: [...projectForm.projectFunctions, newFunction]
    });
    setNewFunction("");
  };
  function handleDeleteTech(e) {
    e.preventDefault();
    setProjectForm({
      ...projectForm,
      tech: projectForm.tech.filter(el => el.techTitle != e.target.value)
    });
  };
  function handleChangeTechSelect(e) {
    setTechAdd(JSON.parse(e.target.value));
  };
  function handleAddTech(e) {
    e.preventDefault();
    setProjectForm({
      ...projectForm,
      tech: [...projectForm.tech, techAdd]
    });
    setNewFunction("");
  };
  useEffect(() => {
    if (!projectForm.projectTitle.trim() || !projectForm.projectImg){
      document.getElementById("postBtn")?.setAttribute("disabled", "");
      document.getElementById("postBtn")?.classList.add("bg-tertiary");
    } else {
      document.getElementById("postBtn")?.removeAttribute("disabled");
      document.getElementById("postBtn")?.classList.remove("bg-tertiary");
    }
    let techsAuxiliar = techs;
    projectForm?.tech?.forEach(el => {
      techsAuxiliar = techsAuxiliar?.filter(t => t.techTitle !== el.techTitle);
    });
    setTechFilter(techsAuxiliar);
    techsAuxiliar && setTechAdd(techsAuxiliar[0]);
    if (document.getElementById("selectTechs").value) document.getElementById("selectTechs").value = JSON.stringify(techsAuxiliar[0]);
  }, [projectForm]);
  return (
    <div className={`w-full h-screen pt-24 overflow-auto z-40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary border border-white rounded py-3 px-4 ${!open && 'hidden'}`}>
      <form className="flex flex-wrap justify-center">
        {
          loading ?
          <div className="flex justify-center self-center w-48 h-48 m-2">
            <Spinner />
          </div> :
          projectForm.projectImg.length ? 
            projectForm.projectImg.map(img => (
              <div 
                key={`${projectForm.id+img}`}
                className="relative w-48 h-48 m-2"
              >
                <img
                  src={img}
                  alt="Imagen no disponible"
                  className="w-full h-full object-cover"
                />
                <div className="absolute left-40 bottom-40 w-8 h-8">
                  <button
                    className="bg-red-500 w-8 h-8 flex justify-center items-center"
                    value={img}
                    onClick={handleDeleteImage}
                  >
                    X
                  </button>
                </div>
              </div>
            )) :
            <div className="relative w-48 h-48 m-2">
              <img
                src={'https://res.cloudinary.com/dg7fmdsmw/image/upload/v1656477521/Portfolio/placeholder/no-image_smhof8.jpg'}
                alt="Imagen no disponible"
                className="w-full h-full object-cover"
              />
            </div>
        }
        {
          errors.fileImg && <span className="text-white w-full text-center">{errors.fileImg}</span>
        }
        <div className="flex flex-wrap justify-center w-full">
          <label
            id="labelInputImg"
            htmlFor="inputImg"
            className="appearance-none focus:outline-none block w-full bg-tertiary hover:bg-secondary text-white border border-white rounded py-3 px-4 m-2 leading-tight cursor-pointer"
          >
            Cargar imagen
          </label>
          <input
            id="inputImg"
            type="file"
            name="file"
            onChange={uploadImage}
            placeholder="Sube una imagen"
            className="hidden"
          />
          <input
            id="projectTitle"
            type="text"
            value={projectForm.projectTitle}
            onChange={handleChange}
            placeholder="Titulo"
            className="appearance-none focus:outline-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 m-2 leading-tight"
          />
          <input
            id="siteUrl"
            type="text"
            value={projectForm.siteUrl}
            onChange={handleChange}
            placeholder="URL del sitio"
            className="appearance-none focus:outline-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 m-2 leading-tight"
          />
          <input
            id="backUrl"
            type="text"
            value={projectForm.backUrl}
            onChange={handleChange}
            placeholder="URL del back"
            className="appearance-none focus:outline-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 m-2 leading-tight"
          />
          <input
            id="frontUrl"
            type="text"
            value={projectForm.frontUrl}
            onChange={handleChange}
            placeholder="URL del front"
            className="appearance-none focus:outline-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 m-2 leading-tight"
          />
          <input
            id="projectDescription"
            type="text"
            value={projectForm.projectDescription}
            onChange={handleChange}
            placeholder="Descripción"
            className="appearance-none focus:outline-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 m-2 leading-tight"
          />
          <input
            id="projectSummary"
            type="text"
            value={projectForm.projectSummary}
            onChange={handleChange}
            placeholder="Resumen"
            className="appearance-none focus:outline-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 m-2 leading-tight"
          />
          <label className="w-full text-center text-white">Características</label>
          <div className="flex w-full justify-center">
            <div className="flex w-56 m-2 border border-white rounded">
              <input
                id={`addFunction`}
                value={newFunction}
                onChange={handleChangeNewFunction}
                className="appearance-none focus:outline-none block w-full bg-tertiary text-white rounded py-3 px-4 leading-tight"
              />
              <button
                className="bg-green-500 flex justify-center items-center py-3 px-4 text-white rounded"
                onClick={handleAddFunction}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-wrap">
          {
            projectForm.projectFunctions.map(f => (
                <div key={f} className="flex m-2 border border-white rounded">
                  <span
                    id={`function-${f}`}
                    className="appearance-none focus:outline-none block w-full bg-tertiary text-white rounded py-3 px-4 leading-tight"
                  >
                    {f}
                  </span>
                  <button
                    className="bg-red-500 flex justify-center items-center py-3 px-4 text-white rounded"
                    value={f}
                    onClick={handleDeleteFunction}
                  >
                    X
                  </button>
                </div>
            ))
          }
          </div>
          <label className="w-full text-center text-white">Techs</label>
          <div className="flex w-full justify-center">
            <div className="flex w-56 m-2 border border-white rounded">
              <select
                id="selectTechs"
                className="focus:outline-none block w-full bg-tertiary text-white rounded py-3 px-4 leading-tight"
                onChange={handleChangeTechSelect}
              >
                {
                  techsFilter?.map(t => (
                    <option
                      key={t.techTitle}
                      value={JSON.stringify(t)}
                      className="w-full"
                    >
                      {t.techTitle}
                    </option>
                  ))
                }
              </select>
              <button
                className="bg-green-500 flex justify-center items-center py-3 px-4 text-white rounded"
                onClick={handleAddTech}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-wrap">
          {
            projectForm?.tech?.map(t => (
                <div key={t.techTitle} className="flex m-2 border border-white rounded">
                  <span
                    id={`function-${t.techTitle}`}
                    className="appearance-none focus:outline-none block w-full bg-tertiary text-white rounded py-3 px-4 leading-tight"
                  >
                    {t.techTitle}
                  </span>
                  <button
                    className="bg-red-500 flex justify-center items-center py-3 px-4 text-white rounded"
                    value={t.techTitle}
                    onClick={handleDeleteTech}
                  >
                    X
                  </button>
                </div>
            ))
          }
          </div>
        </div>
        <div className="flex justify-center w-full text-white">
          <button
            className={`border border-white rounded px-4 py-2 m-2 hover:bg-tertiary`}
            id="postBtn"
            onClick={handleSubmit}
          >
            Guardar
          </button>
          <button
            className="border border-white rounded px-4 py-2 m-2 hover:bg-tertiary"
            id="closeBtn"
            onClick={handleForm}
          >
            Cerrar
          </button>
        </div>
      </form>
    </div>)
}