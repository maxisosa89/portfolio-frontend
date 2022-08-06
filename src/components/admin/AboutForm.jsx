import axios from "axios";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Spinner from "../Spinner";

export default function AboutForm({ aboutData, setAboutData, token }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newSoftSkill, setNewSoftSkill] = useState("");
  const [newSubSkill, setNewSubSkill] = useState("");
  function handleChange(e) {
    e.target.id === "description" ?
    setAboutData({
      ...aboutData,
      [e.target.id]: e.target.value
    }) :
    e.target.id === "softSkillsInput" ?
    setNewSoftSkill(e.target.value) :
    setNewSubSkill(e.target.value)
  };
  function handleAddData(e) {
    e.preventDefault();
    const data = e.target.id === "softSkills" ? newSoftSkill : newSubSkill
    setAboutData({
      ...aboutData,
      [e.target.id]: [...aboutData[e.target.id], data]
    });
    e.target.id === "softSkills" ? setNewSoftSkill("") : setNewSubSkill("");
  };
  function handleDeleteData(e) {
    e.preventDefault();
    setAboutData({
      ...aboutData,
      [e.target.name]: aboutData[e.target.name].filter(el => (typeof el === "object" ? JSON.stringify(el) : el) !== e.target.value)
    });
  };
  async function uploadImage(e) {
    try {
      setLoading(true);
      document.getElementById("inputImg").setAttribute("disabled", "");
      document.getElementById("labelInputImg")?.classList?.remove("hover:bg-secondary");
      document.getElementById("labelInputImg")?.classList?.remove("cursor-pointer");
      const files = e.target.files;
      if (files[0]?.type?.includes("image") || files[0]?.type?.includes("pdf")) {
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "Portfolio");
        const res = await axios.post("https://api.cloudinary.com/v1_1/dg7fmdsmw/image/upload", data);
        setAboutData({
          ...aboutData,
          files: [...aboutData.files, {url: res.data.url, height: res.data.height, width: res.data.width}]
        });
      }
      document.getElementById("inputImg").removeAttribute("disabled");
      document.getElementById("labelInputImg")?.classList?.add("hover:bg-secondary");
      document.getElementById("labelInputImg")?.classList?.add("cursor-pointer");
      setLoading(false);
    } catch (err) {
      console.log("err: ", err);
      setLoading(false);
      e.target.value = null;
      document.getElementById("inputImg").removeAttribute("disabled");
      document.getElementById("labelInputImg")?.classList?.add("hover:bg-secondary");
      document.getElementById("labelInputImg")?.classList?.add("cursor-pointer");
    }
  };
  async function handleSubmit(e) {
    e.preventDefault();
    aboutData.id ?
    await axios.put(`/about/${aboutData.id}`, aboutData, { headers: { Authorization: token } }) :
    await axios.post("/about", aboutData, { headers: { Authorization: token } });
    navigate('/admin/dashboard');
  };
  return (
    <div className={`flex flex-wrap w-full max-w-[1024px] bg-secondary mx-auto p-2 sm:p-10 shadow-md shadow-primary`}>
      <form className="flex flex-wrap justify-center w-full">
        <div className="flex flex-wrap justify-center w-full">
          <input
            id="description"
            type="text"
            value={aboutData.description}
            onChange={handleChange}
            placeholder="Descripción"
            className="appearance-none focus:outline-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 m-2 leading-tight"
          />
          <label className="w-full text-center text-white">Características</label>
          <div className="flex w-full justify-center">
            <div className="flex w-56 m-2 border border-white rounded">
              <input
                id={`softSkillsInput`}
                value={newSoftSkill}
                onChange={handleChange}
                className="appearance-none focus:outline-none block w-full bg-tertiary text-white rounded py-3 px-4 leading-tight"
              />
              <button
                id={`softSkills`}
                className="bg-green-500 flex justify-center items-center py-3 px-4 text-white rounded"
                onClick={handleAddData}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-wrap">
          {
            aboutData.softSkills.map((s, index) => (
                <div key={s+index} className="flex m-2 border border-white rounded">
                  <span
                    id={`function-${s}`}
                    className="appearance-none focus:outline-none block w-full bg-tertiary text-white rounded py-3 px-4 leading-tight"
                  >
                    {s}
                  </span>
                  <button
                    className="bg-red-500 flex justify-center items-center py-3 px-4 text-white rounded"
                    value={s}
                    name={"softSkills"}
                    onClick={handleDeleteData}
                  >
                    X
                  </button>
                </div>
            ))
          }
          </div>
          <div className="flex w-full justify-center">
            <div className="flex w-56 m-2 border border-white rounded">
              <input
                id={`subSkillsInput`}
                value={newSubSkill}
                onChange={handleChange}
                className="appearance-none focus:outline-none block w-full bg-tertiary text-white rounded py-3 px-4 leading-tight"
              />
              <button
                id={`subSkills`}
                className="bg-green-500 flex justify-center items-center py-3 px-4 text-white rounded"
                onClick={handleAddData}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-wrap">
          {
            aboutData.subSkills.map((s, index) => (
                <div key={s+index} className="flex m-2 border border-white rounded">
                  <span
                    id={`function-${s}`}
                    className="appearance-none focus:outline-none block w-full bg-tertiary text-white rounded py-3 px-4 leading-tight"
                  >
                    {s}
                  </span>
                  <button
                    className="bg-red-500 flex justify-center items-center py-3 px-4 text-white rounded"
                    value={s}
                    name={"subSkills"}
                    onClick={handleDeleteData}
                  >
                    X
                  </button>
                </div>
            ))
          }
          </div>
          <div className="flex flex-wrap justify-center items-center w-full">
            {
              loading ? 
              <div className="w-full">
                <Spinner />
              </div> :
              <label
                id="labelInputImg"
                htmlFor="inputImg"
                className="appearance-none focus:outline-none block w-full bg-tertiary hover:bg-secondary text-white border border-white rounded py-3 px-4 m-2 leading-tight cursor-pointer"
              >
                Cargar documento
              </label>
            }
            <input
              id="inputImg"
              type="file"
              name="file"
              onChange={uploadImage}
              placeholder="Sube un documento"
              className="hidden"
            />
            {
              aboutData?.files?.map(f => (
                <div key={f.url} className="relative mx-auto my-2">
                  <img
                    src={f.url.slice(0, -3)+"jpg"}
                    alt="Not Found"
                    width={f.width}
                    className="max-w-[250px]"
                  />
                  <div className={`absolute right-0 top-0 bottom-40 w-8 h-8`}>
                    <button
                      className="bg-red-500 w-8 h-8 flex justify-center items-center"
                      value={JSON.stringify(f)}
                      name="files"
                      onClick={handleDeleteData}
                    >
                      X
                    </button>
                  </div>
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