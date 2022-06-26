import React from "react";
import {format} from 'date-fns'

export default function MessagesCardAdmin({ message, handleRead, handleDelete, handleModal }) {
    return (
        <div>
            <hr className="my-1 mx-2 md:mx-5 border border-gray-400" />
            <div name="containerCardMessageList" className="flex flex-wrap px-4 md:px-8 lg:px-16">
                <div className="flex flex-wrap my-2 p-1 md:py-5 md:w-10/12 lg:w-11/12">
                    <div className="w-full my-2">
                        <p className={!message.read ? `font-bold` : undefined}>Fecha: {format(new Date(message.createdAt), "dd'/'MM'/'yyyy' - 'H':'mm")}</p>
                    </div>
                    <div className="w-full md:w-1/2 my-2 break-all">
                        <p className={!message.read ? `font-bold` : undefined}>De: {message.name}</p>
                    </div>
                    <div className="w-full md:w-1/2 my-2 break-all">
                        <p className={!message.read ? `font-bold` : undefined}>Mail: {message.mail}</p>
                    </div>
                    <hr className="my-1 w-full border border-gray-500" />
                    <div className="w-full my-2 break-all">
                        <p>{message.message}</p>
                    </div>
                </div>
                <div className="w-full md:w-2/12 lg:w-1/12 self-center">
                    <div className="flex md:block justify-center">
                        {
                            message.read ?
                            <input
                                id={message.id}
                                type="button"
                                className="h-12 w-12 mx-2 my-2 border-4 border-blue-900 rounded hover:bg-blue-500 bg-unread bg-no-repeat bg-contain cursor-pointer"
                                onClick={handleRead}
                                name="btnProjectCardAdmin"
                            /> :
                            <input
                                id={message.id}
                                type="button"
                                className="h-12 w-12 mx-2 my-2 border-4 border-blue-900 rounded hover:bg-blue-500 bg-read bg-no-repeat bg-contain cursor-pointer"
                                onClick={handleRead}
                                name="btnProjectCardAdmin"
                            />
                        }
                        <input
                            type="button"
                            className="h-12 w-12 mx-2 my-2 border-4 border-red-900 rounded hover:bg-red-500 self-center bg-delete bg-no-repeat bg-contain cursor-pointer"
                            onClick={handleModal}
                            name="btnProjectCardAdmin"
                        />
                    </div>
                </div>
            </div>
            <hr className="my-2 mx-2 md:mx-5 border border-gray-400" />
            {/* Modal */}
            <div id="modalDelete" className="hidden z-40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:max-w-[400px] bg-secondary text-white border border-white rounded py-3 px-4">
                <div className="">
                    <h1>Eliminar mensaje</h1>
                </div>
                <hr className="border border-primary" />
                <div className="py-5">
                    <p>
                        Está seguro de eliminar este mensaje?
                    </p>
                </div>
                <div className="flex justify-center">
                    <button
                        id={message.id}
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