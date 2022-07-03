import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
export default function TechsForm({ techForm, setTechForm, open = false, handleForm, handleSubmit, errors, setErrors }) {
  const [loading, setLoading] = useState(false);
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
        setTechForm({
          ...techForm,
          techImg: res.data.url
        });
        setErrors({
          ...errors,
          fileImg: undefined
        });
      } else if (files[0]?.type) {
        setTechForm({
          ...techForm,
          techImg: ""
        });
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
      setTechForm({
        ...techForm,
        techImg: ""
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
    setTechForm({
      ...techForm,
      [e.target.id]: e.target.value
    });
  };
  useEffect(() => {
    if (!techForm.techTitle.trim() || !techForm.techImg.trim()){
      document.getElementById("postBtn")?.setAttribute("disabled", "");
      document.getElementById("postBtn")?.classList.add("bg-tertiary");
    } else {
      document.getElementById("postBtn")?.removeAttribute("disabled");
      document.getElementById("postBtn")?.classList.remove("bg-tertiary");
    }
    
  }, [techForm]);
  return (
    <div className={`w-full max-w-[400px] z-40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary border border-white rounded py-3 px-4 ${!open && 'hidden'}`}>
      <form className="flex flex-wrap justify-center">
        {
          loading ?
          <div className="flex justify-center self-center w-48 h-48 m-2">
            <Spinner />
          </div> :
          <img
            src={techForm.techImg || 'https://res.cloudinary.com/dg7fmdsmw/image/upload/v1656477521/Portfolio/placeholder/no-image_smhof8.jpg'}
            alt="Imagen no disponible"
            className="w-48 h-48 m-2 object-cover"
          />
        }
        {
          errors.fileImg && <span className="text-white">{errors.fileImg}</span>
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
            id="techTitle"
            type="text"
            value={techForm.techTitle}
            onChange={handleChange}
            placeholder="Nombre"
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