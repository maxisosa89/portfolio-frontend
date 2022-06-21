import React from "react";

export default function ContactPage () {
    return (
        <div className="container mx-auto bg-tertiary pt-24">
            <h1 className="text-5xl text-center text-white font-bold uppercase">Contacto</h1>
            <form className="flex flex-wrap w-full max-w-[1024px] bg-secondary mx-auto p-10">
                <div className="w-full md:w-1/2 px-3 py-3">
                    <label className="text-xl uppercase tracking-wide text-white font-bold mb-2" htmlFor="name">
                        Nombre
                    </label>
                    <input className="appearance-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 leading-tight" id="name" type="text" placeholder="Nombre..." />
                </div>
                <div className="w-full md:w-1/2 px-3 py-3">
                    <label className="text-xl uppercase tracking-wide text-white font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="appearance-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 leading-tight" id="email" type="text" placeholder="Email..." />
                </div>
                <div className="w-full px-3 py-3">
                    <label className="text-xl uppercase tracking-wide text-white font-bold mb-2" htmlFor="message">
                        Mensaje
                    </label>
                    <textarea className="appearance-none block w-full h-[200px] bg-tertiary text-white border border-white rounded py-3 px-4 leading-tight" id="message" type="text" placeholder="Mensaje..." />
                </div>
                <div className="w-full md:w-1/2 px-3 py-3">
                    <button className="w-full bg-secondary hover:bg-tertiary text-white border font-semibold border-white rounded py-3 px-4 leading-tight">Enviar</button>
                </div>
                <div className="w-full md:w-1/2 px-3 py-3">
                    <button className="w-full bg-secondary hover:bg-tertiary text-white border font-semibold border-white rounded py-3 px-4 leading-tight">Limpiar</button>
                </div>
            </form>
        </div>
    )
}