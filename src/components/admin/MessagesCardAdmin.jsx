import React from "react";
import {format} from 'date-fns'

export default function MessagesCardAdmin({ message, handleRead }) {
    return (
        <div>
            <hr className="my-1 mx-2 md:mx-5 border border-gray-400" />
            <div className="flex flex-wrap px-4 md:px-8 lg:px-16">
                <div className="flex flex-wrap my-2 p-1 md:py-5 md:w-10/12 lg:w-11/12">
                    <div className="w-full my-2">
                        <p>Fecha: {format(new Date(message.createdAt), "dd'/'MM'/'yyyy' - 'H':'mm")}</p>
                    </div>
                    <div className="w-full md:w-1/2 my-2 break-all">
                        <p>De: {message.name}</p>
                    </div>
                    <div className="w-full md:w-1/2 my-2 break-all">
                        <p>Mail: {message.mail}</p>
                    </div>
                    <hr className="my-1 w-full border border-gray-500" />
                    <div className="w-full my-2 break-all">
                        <p>{message.message}</p>
                    </div>
                </div>
                <div className="w-full md:w-2/12 lg:w-1/12 self-center">
                    <div className="flex md:inline justify-center">
                        {
                            message.read ?
                            <img
                                id={message.id}
                                src="https://res.cloudinary.com/dg7fmdsmw/image/upload/v1656069390/Portfolio/iconos/unread_janl1n.png"
                                alt="No Leer"
                                className="h-16 mx-2 md:mx-auto lg:mx-2 md:my-2 border-4 border-blue-900 rounded cursor-pointer hover:bg-blue-500"
                                onClick={handleRead}
                            /> :
                            <img
                                id={message.id}
                                src="https://res.cloudinary.com/dg7fmdsmw/image/upload/v1656069390/Portfolio/iconos/read_i7fhfl.png"
                                alt="Leer"
                                className="h-16 mx-2 md:mx-auto lg:mx-2 md:my-2 border-4 border-blue-900 rounded cursor-pointer hover:bg-blue-500"
                                onClick={handleRead}
                            />
                        }
                        <img
                            src="https://res.cloudinary.com/dg7fmdsmw/image/upload/v1656060758/Portfolio/iconos/delete_g3pwe2.png"
                            alt="Eliminar"
                            className="h-16 mx-2 md:mx-auto lg:mx-2 md:my-2 border-4 border-red-900 rounded cursor-pointer hover:bg-red-500"
                            onClick={e => console.log("borrar")}
                        />
                    </div>
                </div>
            </div>
            <hr className="my-2 mx-2 md:mx-5 border border-gray-400" />
        </div>)
}