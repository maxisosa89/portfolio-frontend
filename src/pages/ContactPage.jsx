import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [dataForm, setDataForm] = useState({
    name: '',
    mail: '',
    message: ''
  });
  function handleChange(e) {
    document.getElementById(e.target.id)?.classList.remove("border-red-500");
    setDataForm({
      ...dataForm,
      [e.target.id]: e.target.value
    });
  };
  function handleClear(e) {
    e.preventDefault();
    setDataForm({
      name: '',
      mail: '',
      message: ''
    });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);
    setLoading(true);
    if (Object.entries(errors).length === 0) {
      await axios.post("http://localhost:3001/messages", dataForm);
      handleClear(e);
      document.getElementById("modalSucces").classList.remove("hidden");
      setIsSubmit(false);
    } else {
      const inputs = document.getElementsByName("inputForm");
      const btnForm = document.getElementsByName("buttonForm");
      inputs.forEach(i => {
        i.setAttribute("disabled", "");
      });
      btnForm.forEach(i => {
        i.setAttribute("disabled", "");
        i.classList.remove("hover:bg-tertiary");
      });
      document.getElementById("modalError").classList.remove("hidden");
      document.getElementById("formContact").classList.add("blur-sm");
      setLoading(false);
    }
  };
  function handleCloseModal(e) {
    e.preventDefault();
    const inputs = document.getElementsByName("inputForm");
    const btnForm = document.getElementsByName("buttonForm");
    inputs.forEach(i => {
      i.removeAttribute("disabled");
    });
    btnForm.forEach(i => {
      i.removeAttribute("disabled");
      i.classList.add("hover:bg-tertiary");
    });
    document.getElementById(e.target.name).classList.add("hidden");
    document.getElementById("formContact")?.classList.remove("blur-sm");
    setLoading(false);
  };
  useEffect(() => {
    function validate(data) {
      const err = {};
      if (!data.name) err.name = true;
      if (!data.message) err.message = true;
      if (!data.mail) {
        err.mail = {
          mail: true,
        };
      } else if (!validateEmail(data.mail)) {
        err.mail = {
          mailFormat: true,
        };
      };
      return err;
    };
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };
    setErrors(validate(dataForm));
  }, [dataForm]);
  useEffect(() => {
    function handlePaintBox() {
      Object.keys(dataForm)?.map(e => (
        Object.keys(errors)?.includes(e) ?
          document.getElementById(e)?.classList.add("border-red-500")
          :
          document.getElementById(e)?.classList.remove("border-red-500")
      ))
    };
    isSubmit && handlePaintBox();
  }, [errors, isSubmit, dataForm]);
  return (
    <div className="container relative mx-auto bg-tertiary pt-24">
      {
        loading ?
          <div className="fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div> :
          <form
            id="formContact"
            onSubmit={handleSubmit}
            className="flex flex-wrap w-full max-w-[1024px] bg-secondary mx-auto p-10 shadow-md shadow-primary"
          >
            <div className="w-full lg:w-1/2 px-3 py-3">
              <label className="text-xl uppercase tracking-wide text-white font-bold mb-2" htmlFor="name">
                Nombre
              </label>
              {
                errors.name && <span className="text-white ml-2">* Requerido</span>
              }
              <input
                value={dataForm.name}
                autoComplete="off"
                onChange={handleChange}
                className="appearance-none focus:outline-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 leading-tight"
                id="name"
                name="inputForm"
                type="text"
                placeholder="Nombre..." />
            </div>
            <div className="w-full lg:w-1/2 px-3 py-3">
              <label className="text-xl uppercase tracking-wide text-white font-bold mb-2" htmlFor="mail">
                Email
              </label>
              {
                errors.mail?.mail && <span className="text-white ml-2">* Requerido</span>
              }
              {
                errors.mail?.mailFormat && <span className="text-white ml-2">* Ingrese un mail válido</span>
              }
              <input
                value={dataForm.mail}
                autoComplete="off"
                onChange={handleChange}
                name="inputForm"
                className="appearance-none focus:outline-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 leading-tight"
                id="mail"
                type="text"
                placeholder="Email..." />
            </div>
            <div className="w-full px-3 py-3">
              <label className="text-xl uppercase tracking-wide text-white font-bold mb-2" htmlFor="message">
                Mensaje
              </label>
              {
                errors.message && <span className="text-white ml-2">* Requerido</span>
              }
              <textarea
                value={dataForm.message}
                autoComplete="off"
                onChange={handleChange}
                name="inputForm"
                className="appearance-none focus:outline-none block w-full h-[200px] bg-tertiary text-white border border-white rounded py-3 px-4 leading-tight"
                id="message"
                type="text"
                placeholder="Mensaje..." />
            </div>
            <div className="w-full lg:w-1/2 px-3 py-3">
              <button
                type="submit"
                name="buttonForm"
                className="w-full bg-secondary hover:bg-tertiary text-white border font-semibold border-white rounded py-3 px-4 leading-tight">
                Enviar
              </button>
            </div>
            <div className="w-full lg:w-1/2 px-3 py-3">
              <button
                onClick={handleClear}
                name="buttonForm"
                className="w-full bg-secondary hover:bg-tertiary text-white border font-semibold border-white rounded py-3 px-4 leading-tight">
                Limpiar
              </button>
            </div>
          </form>
      }
      {/* Modal */}
      <div id="modalSucces" className="hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:max-w-[400px] bg-secondary text-white border border-white rounded py-3 px-4">
        <div className="">
          <h1>Mensaje enviado</h1>
        </div>
        <hr className="border border-primary" />
        <div className="py-5">
          <p>
            Gracias por tu contacto, estaré contestando a la brevedad.
            <br />
            <br />
            Saludos.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            name="modalSucces"
            className="bg-secondary hover:bg-tertiary text-white border border-white rounded py-1 px-4 h-10"
            onClick={handleCloseModal}>
            Continuar
          </button>
        </div>
      </div>
      {/* Modal error */}
      <div id="modalError" className="hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:max-w-[400px] bg-secondary text-white border border-white rounded py-3 px-4">
        <div className="">
          <h1>Error</h1>
        </div>
        <hr className="border border-primary" />
        <div className="py-5">
          <p>
            Debe completar todos los campos.
            <br />
            Asegurese de utilizar una dirección de mail válida.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            name="modalError"
            className="bg-secondary hover:bg-tertiary text-white border border-white rounded py-1 px-4 h-10"
            onClick={handleCloseModal}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}