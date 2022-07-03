import React, { useEffect, useState } from "react";
import axios from "axios";
import TechsCard from "../../components/admin/TechsCardAdmin";
import TechsForm from "../../components/admin/TechsForm";
import Spinner from "../../components/Spinner";

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
      const allT = await axios.get('http://localhost:3001/techs');
      setTechs(allT.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  function handleForm(e) {
    e.preventDefault();
    (e.target.id === "addBtn" || e.target.id === "editBtn") && setOpenForm(true);
    if (e.target.id === "closeBtn") {
      setOpenForm(false);
      setErrors({
        ...errors,
        fileImg: undefined
      });
      setTechForm({
        techImg: '',
        techTitle: ''
      });
    };
  };
  async function handleSubmit(e) {
    try {
      e.preventDefault();
        if (!techForm.id) {
          await axios.post("http://localhost:3001/techs", {techTitle: techForm.techTitle.trim(), techImg: techForm.techImg});
        } else {
          await axios.put(`http://localhost:3001/techs/${techForm.id}`, {techTitle: techForm.techTitle.trim(), techImg: techForm.techImg});
        };
      setTechForm({
        techImg: '',
        techTitle: ''
      });
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
        <img
          id="addBtn"
          src="https://res.cloudinary.com/dg7fmdsmw/image/upload/v1656061619/Portfolio/iconos/add_oeqefo.png"
          alt="Agregar"
          className="relative inset-x-2 inset-y-px w-11 h-11 cursor-pointer"
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
                  <TechsCard tech={t} setTechForm={setTechForm} handleForm={handleForm} />
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