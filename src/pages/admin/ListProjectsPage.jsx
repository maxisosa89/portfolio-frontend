import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectsCard from "../../components/admin/ProjectsCardAdmin";
import ProjectsForm from "../../components/admin/ProjectsForm";
import Spinner from "../../components/Spinner";

export default function ListProjectsPage() {
  const [projects, setProjects] = useState();
  const [techs, setTechs] = useState();
  const [projectForm, setProjectForm] = useState({
    projectTitle: '',
    projectImg: [],
    projectSummary: '',
    projectDescription: '',
    projectFunctions: [],
    siteUrl: '',
    frontUrl: '',
    backUrl: '',
    tech: []
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [newFunction, setNewFunction] = useState("");
  const getAllProjects = async () => {
    try {
      setLoading(true);
      const allP = await axios.get('http://localhost:3001/projects');
      setProjects(allP.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const getAllTechs = async () => {
    try {
      setLoading(true);
      const allT = await axios.get('http://localhost:3001/techs');
      setTechs(allT.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  function handleForm(e) {
    e.preventDefault();
    if (e.target.id === "addBtn" || e.target.id === "editBtn"){
      setOpenForm(true);
      const blurDiv = document.getElementsByName("containerCardProjectList");
      blurDiv.forEach(b => {
          b.classList.toggle("blur-sm");
      });
      const btnsCards = document.getElementsByName("btnProjectCardAdmin");
      btnsCards.forEach(b => {
          b.setAttribute("disabled", "");
          b.classList.toggle("hover:bg-transparent");
          b.classList.toggle("cursor-pointer");
      });;
      document.getElementById("addBtn")?.setAttribute("disabled", "");
      document.getElementById("addBtn")?.classList.toggle("cursor-pointer");
      document.getElementById("addBtn")?.classList.toggle("blur-sm");
    } else if (e.target.id === "closeBtn") {
      setOpenForm(false);
      setErrors({
        ...errors,
        fileImg: undefined
      });
      setProjectForm({
        projectTitle: '',
        projectImg: [],
        projectSummary: '',
        projectDescription: '',
        projectFunctions: [],
        siteUrl: '',
        frontUrl: '',
        backUrl: '',
        tech: []
      });
      setNewFunction("");
      const blurDiv = document.getElementsByName("containerCardProjectList");
      blurDiv.forEach(b => {
          b.classList.toggle("blur-sm");
      });
      const btnsCards = document.getElementsByName("btnProjectCardAdmin");
      btnsCards.forEach(b => {
          b.removeAttribute("disabled", "");
          b.classList.toggle("hover:bg-transparent");
          b.classList.toggle("cursor-pointer");
      });;
      document.getElementById("addBtn")?.removeAttribute("disabled", "");
      document.getElementById("addBtn")?.classList.toggle("cursor-pointer");
      document.getElementById("addBtn")?.classList.toggle("blur-sm");
    };
  };
  async function handleDelete (e) {
    e.preventDefault();
    if (e.target.id !== "noDelete") {
        setLoading(true);
        await axios.delete(`http://localhost:3001/projects/${e.target.id}`);
        document.getElementById("addBtn")?.removeAttribute("disabled", "");
        document.getElementById("addBtn")?.classList.toggle("cursor-pointer");
        document.getElementById("addBtn")?.classList.toggle("blur-sm");
        getAllProjects();
    } else {
        document.getElementById("modalDelete")?.classList.add("hidden");
        const blurDiv = document.getElementsByName("containerCardProjectList");
        blurDiv.forEach(b => {
            b.classList.toggle("blur-sm");
        });
        const btnsCards = document.getElementsByName("btnProjectCardAdmin");
        btnsCards.forEach(b => {
            b.removeAttribute("disabled");
            b.classList.toggle("hover:bg-transparent");
            b.classList.toggle("cursor-pointer");
        });
        document.getElementById("addBtn")?.removeAttribute("disabled", "");
        document.getElementById("addBtn")?.classList.toggle("cursor-pointer");
        document.getElementById("addBtn")?.classList.toggle("blur-sm");
    }
    setProjectForm({
      projectTitle: '',
      projectImg: [],
      projectSummary: '',
      projectDescription: '',
      projectFunctions: [],
      siteUrl: '',
      frontUrl: '',
      backUrl: '',
      tech: []
    });
  };
  function handleModal (e) {
      e.preventDefault();
      document.getElementById("modalDelete")?.classList.remove("hidden");
      const blurDiv = document.getElementsByName("containerCardProjectList");
      blurDiv.forEach(b => {
          b.classList.toggle("blur-sm");
      });
      const btnsCards = document.getElementsByName("btnProjectCardAdmin");
      btnsCards.forEach(b => {
          b.setAttribute("disabled", "");
          b.classList.toggle("hover:bg-transparent");
          b.classList.toggle("cursor-pointer");
      });;
      document.getElementById("addBtn")?.setAttribute("disabled", "");
      document.getElementById("addBtn")?.classList.toggle("cursor-pointer");
      document.getElementById("addBtn")?.classList.toggle("blur-sm");
  };
  async function handleSubmit(e) {
    try {
      e.preventDefault();
        if (!projectForm.id) {
          await axios.post("http://localhost:3001/projects",
            {
                projectTitle: projectForm.projectTitle.trim(),
                projectImg: projectForm.projectImg,
                projectSummary: projectForm.projectSummary,
                projectDescription: projectForm.projectDescription,
                projectFunctions: projectForm.projectFunctions,
                siteUrl: projectForm.siteUrl,
                frontUrl: projectForm.frontUrl,
                backUrl: projectForm.backUrl,
                tech: projectForm.tech
            });
        } else {
          await axios.put(`http://localhost:3001/projects/${projectForm.id}`,
            {
                projectTitle: projectForm.projectTitle.trim(),
                projectImg: projectForm.projectImg,
                projectSummary: projectForm.projectSummary,
                projectDescription: projectForm.projectDescription,
                projectFunctions: projectForm.projectFunctions,
                siteUrl: projectForm.siteUrl,
                frontUrl: projectForm.frontUrl,
                backUrl: projectForm.backUrl,
                tech: projectForm.tech
            });
        };
      setProjectForm({
        projectTitle: '',
        projectImg: [],
        projectSummary: '',
        projectDescription: '',
        projectFunctions: [],
        siteUrl: '',
        frontUrl: '',
        backUrl: '',
        tech: []
      });
      document.getElementById("addBtn")?.removeAttribute("disabled", "");
      document.getElementById("addBtn")?.classList.toggle("cursor-pointer");
      document.getElementById("addBtn")?.classList.toggle("blur-sm");
      setOpenForm(false);
      getAllProjects();
    } catch(e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllProjects();
    getAllTechs();
  }, []);
  return (
    <div className="container mx-auto bg-tertiary pt-24">
      <div className="flex justify-center">
        <input
          id="addBtn"
          type="button"
          className="h-12 w-12 mx-2 my-2 self-center bg-add bg-tertiary bg-no-repeat bg-contain cursor-pointer"
          onClick={handleForm}
        />
      </div>
      {
        loading ?
          <div className="fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div> :
          <div>
            {
              projects?.map(p => (
                <div key={p.id} className="my-5 mx-0 md:mx-5">
                  <ProjectsCard
                    project={p}
                    projectForm={projectForm}
                    setProjectForm={setProjectForm}
                    handleForm={handleForm}
                    handleDelete={handleDelete}
                    handleModal={handleModal}
                  />
                </div>
              ))
            }
            <ProjectsForm
              open={openForm}
              handleForm={handleForm}
              projectForm={projectForm}
              setProjectForm={setProjectForm}
              handleSubmit={handleSubmit}
              errors={errors}
              setErrors={setErrors}
              newFunction={newFunction}
              setNewFunction={setNewFunction}
              techs={techs}
              setTechs={setTechs}
            />
          </div>
      }
    </div>
  )
}