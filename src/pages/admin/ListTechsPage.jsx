import React, { useEffect, useState } from "react";
import axios from "axios";
import TechsCard from "../../components/admin/TechsCardAdmin";
import TechsForm from "../../components/admin/TechsForm";
import Spinner from "../../components/Spinner";

const token = localStorage.getItem("tokenPortfolioMS");
export default function ListTechsPage() {
  const [techs, setTechs] = useState();
  const [techForm, setTechForm] = useState({
    techImg: '',
    techTitle: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const getAllTechs = async () => {
    try {
      setLoading(true);
      const allT = await axios.get('http://localhost:3001/techs', { headers: { Authorization: token } });
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
      const blurDiv = document.getElementsByName("containerCardTechList");
      blurDiv.forEach(b => {
          b.classList.toggle("blur-sm");
      });
      const btnsCards = document.getElementsByName("btnTechCardAdmin");
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
      setTechForm({
        techImg: '',
        techTitle: ''
      });
      const blurDiv = document.getElementsByName("containerCardTechList");
      blurDiv.forEach(b => {
          b.classList.toggle("blur-sm");
      });
      const btnsCards = document.getElementsByName("btnTechCardAdmin");
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
        await axios.delete(`http://localhost:3001/techs/${e.target.id}`, { headers: { Authorization: token } });
        document.getElementById("addBtn")?.removeAttribute("disabled", "");
        document.getElementById("addBtn")?.classList.toggle("cursor-pointer");
        document.getElementById("addBtn")?.classList.toggle("blur-sm");
        getAllTechs();
        setTechForm({
          techImg: '',
          techTitle: ''
        });
    } else {
        document.getElementById("modalDelete")?.classList.add("hidden");
        const blurDiv = document.getElementsByName("containerCardTechList");
        blurDiv.forEach(b => {
            b.classList.toggle("blur-sm");
        });
        const btnsCards = document.getElementsByName("btnTechCardAdmin");
        btnsCards.forEach(b => {
            b.removeAttribute("disabled");
            b.classList.toggle("hover:bg-transparent");
            b.classList.toggle("cursor-pointer");
        });
        document.getElementById("addBtn")?.removeAttribute("disabled", "");
        document.getElementById("addBtn")?.classList.toggle("cursor-pointer");
        document.getElementById("addBtn")?.classList.toggle("blur-sm");
    }
  };
  function handleModal (e) {
      e.preventDefault();
      document.getElementById("modalDelete")?.classList.remove("hidden");
      const blurDiv = document.getElementsByName("containerCardTechList");
      blurDiv.forEach(b => {
          b.classList.toggle("blur-sm");
      });
      const btnsCards = document.getElementsByName("btnTechCardAdmin");
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
        if (!techForm.id) {
          await axios.post("http://localhost:3001/techs", {techTitle: techForm.techTitle.trim(), techImg: techForm.techImg}, { headers: { Authorization: token } });
        } else {
          await axios.put(`http://localhost:3001/techs/${techForm.id}`, {techTitle: techForm.techTitle.trim(), techImg: techForm.techImg}, { headers: { Authorization: token } });
        };
      setTechForm({
        techImg: '',
        techTitle: ''
      });
      document.getElementById("addBtn")?.removeAttribute("disabled", "");
      document.getElementById("addBtn")?.classList.toggle("cursor-pointer");
      document.getElementById("addBtn")?.classList.toggle("blur-sm");
      setOpenForm(false);
      getAllTechs();
    } catch(e) {
      console.log(e);
    }
  };
  useEffect(() => {
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
              techs?.map(t => (
                <div key={t.id} className="my-5 mx-0 md:mx-5">
                  <TechsCard
                    tech={t}
                    techForm={techForm}
                    setTechForm={setTechForm}
                    handleForm={handleForm}
                    handleDelete={handleDelete}
                    handleModal={handleModal}
                  />
                </div>
              ))
            }
            <TechsForm
              open={openForm}
              handleForm={handleForm}
              techForm={techForm}
              setTechForm={setTechForm}
              handleSubmit={handleSubmit}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
      }
    </div>
  )
}