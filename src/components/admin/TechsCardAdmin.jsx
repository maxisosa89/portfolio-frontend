import React from "react";
export default function TechsCardAdmin({ tech, techForm, setTechForm, handleForm, handleDelete, handleModal }) {
    return (
        <div>
            <hr className="my-1 mx-5 border border-gray-400" />
            <div name="containerCardTechList" className="flex flex-wrap my-2 mx-7 md:h-64">
                <img
                    src={tech.techImg}
                    alt="Imagen no disponible"
                    className="w-full md:w-5/12 h-48 md:h-64 object-cover"
                />
                <div className="w-full md:w-6/12 text-4xl p-5 text-center self-center">
                    <p className="break-all">{tech.techTitle}</p>
                </div>
                <div className="w-full md:w-1/12 self-center">
                    <div className="flex md:inline justify-center">
                        <input
                            id="editBtn"
                            type="button"
                            className="h-12 w-12 mx-2 my-2 border-4 border-blue-900 rounded hover:bg-blue-500 self-center bg-edit bg-no-repeat bg-contain cursor-pointer"
                            onClick={e => {
                                setTechForm(tech);
                                handleForm(e);
                            }}
                            name="btnTechCardAdmin"
                        />
                        <input
                            type="button"
                            className="h-12 w-12 mx-2 my-2 border-4 border-red-900 rounded hover:bg-red-500 self-center bg-delete bg-no-repeat bg-contain cursor-pointer"
                            onClick={e => {
                                setTechForm(tech);
                                handleModal(e);
                            }}
                            name="btnTechCardAdmin"
                        />
                    </div>
                </div>
            </div>
            <hr className="my-2 mx-5 border border-gray-400" />
            {/* Modal */}
            <div id="modalDelete" className="hidden z-40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:max-w-[400px] bg-secondary text-white border border-white rounded py-3 px-4">
                <div className="">
                    <h1>Eliminar tech</h1>
                </div>
                <hr className="border border-primary" />
                <div className="py-5">
                    <p>
                        Está seguro de eliminar esta tech?
                    </p>
                </div>
                <div className="flex justify-center">
                    <button
                        id={techForm.id}
                        className="bg-secondary hover:bg-tertiary text-white border border-white rounded py-1 px-4 h-10"
                        onClick={handleDelete}>
                        SI
                    </button>
                    <button
                        id="noDelete"
                        className="bg-secondary hover:bg-tertiary text-white border border-white rounded py-1 px-4 h-10"
                        onClick={handleDelete}>
                        NO
                    </button>
                </div>
            </div>
        </div>)
}