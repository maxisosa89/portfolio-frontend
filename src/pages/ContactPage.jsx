import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

export default function ContactPage () {
    const [loading, setLoading] = useState(false);
    const [dataForm, setDataForm] = useState({
        name: '',
        mail: '',
        message: ''
    });
    function handleChange(e) {
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
        setLoading(true);
        await axios.post("http://localhost:3001/messages", dataForm);
        handleClear(e);
        setLoading(false);
    };
    useEffect(() => {
        console.log(dataForm);
    }, [dataForm])
    return (
        <div className="container mx-auto bg-tertiary pt-24">
            <h1 className="text-5xl text-center text-white font-bold uppercase">Contacto</h1>
            {
                loading ?
                <Spinner /> :
                <form className="flex flex-wrap w-full max-w-[1024px] bg-secondary mx-auto p-10">
                    <div className="w-full lg:w-1/2 px-3 py-3">
                        <label className="text-xl uppercase tracking-wide text-white font-bold mb-2" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            value={dataForm.name}
                            onChange={handleChange}
                            className="appearance-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 leading-tight"
                            id="name"
                            type="text"
                            placeholder="Nombre..." />
                    </div>
                    <div className="w-full lg:w-1/2 px-3 py-3">
                        <label className="text-xl uppercase tracking-wide text-white font-bold mb-2" htmlFor="mail">
                            Email
                        </label>
                        <input
                            value={dataForm.mail}
                            onChange={handleChange}
                            className="appearance-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 leading-tight"
                            id="mail"
                            type="text"
                            placeholder="Email..." />
                    </div>
                    <div className="w-full px-3 py-3">
                        <label className="text-xl uppercase tracking-wide text-white font-bold mb-2" htmlFor="message">
                            Mensaje
                        </label>
                        <textarea
                            value={dataForm.message}
                            onChange={handleChange}
                            className="appearance-none block w-full h-[200px] bg-tertiary text-white border border-white rounded py-3 px-4 leading-tight"
                            id="message"
                            type="text"
                            placeholder="Mensaje..." />
                    </div>
                    <div className="w-full lg:w-1/2 px-3 py-3">
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-secondary hover:bg-tertiary text-white border font-semibold border-white rounded py-3 px-4 leading-tight">
                                Enviar
                        </button>
                    </div>
                    <div className="w-full lg:w-1/2 px-3 py-3">
                        <button
                            onClick={handleClear}
                            className="w-full bg-secondary hover:bg-tertiary text-white border font-semibold border-white rounded py-3 px-4 leading-tight">
                                Limpiar
                        </button>
                    </div>
                </form>
            }
        </div>
    )
}