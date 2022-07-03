import React, { useEffect, useState } from "react";
import axios from "axios";
import MessagesCard from "../../components/admin/MessagesCardAdmin";
import Spinner from "../../components/Spinner";

export default function ListMessagesPage () {
    const [messages, setMessages] = useState();
    const [loading, setLoading] = useState(true);
    const getAllMessages = async () => {
        const allM = await axios.get('http://localhost:3001/messages');
        setMessages(allM.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setLoading(false);
    };
    async function handleRead (e) {
        e.preventDefault();
        await axios.put(`http://localhost:3001/messages/${e.target.id}`)
        getAllMessages();
    };
    async function handleDelete (e) {
        e.preventDefault();
        if (e.target.id !== "noDelete") {
            setLoading(true);
            await axios.delete(`http://localhost:3001/messages/${e.target.id}`);
            getAllMessages();
        } else {
            document.getElementById("modalDelete")?.classList.add("hidden");
            const blurDiv = document.getElementsByName("containerCardMessageList");
            blurDiv.forEach(b => {
                b.classList.toggle("blur-sm");
            });
            const btnsCards = document.getElementsByName("btnProjectCardAdmin");
            btnsCards.forEach(b => {
                b.removeAttribute("disabled");
                b.classList.toggle("hover:bg-transparent");
                b.classList.toggle("cursor-pointer");
            });
        }
    };
    function handleModal (e) {
        e.preventDefault();
        document.getElementById("modalDelete")?.classList.remove("hidden");
        const blurDiv = document.getElementsByName("containerCardMessageList");
        blurDiv.forEach(b => {
            b.classList.toggle("blur-sm");
        });
        const btnsCards = document.getElementsByName("btnProjectCardAdmin");
        btnsCards.forEach(b => {
            b.setAttribute("disabled", "");
            b.classList.toggle("hover:bg-transparent");
            b.classList.toggle("cursor-pointer");
        });
    };
    useEffect(() => {
        getAllMessages();
    }, []);
    return (
        <div className="container mx-auto bg-tertiary pt-24">
            {
                loading ?
                <div className="fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2">
                    <Spinner />
                </div> :
                <div>
                    <div className="flex justify-center">
                        <button className="border border-white bg-secondary hover:bg-tertiary text-white font-semibold py-2 px-4 m-1 rounded-full">Todos (10)</button>
                        <button className="border border-white bg-secondary hover:bg-tertiary text-white font-semibold py-2 px-4 m-1 rounded-full">No Leídos (5)</button>
                    </div>
                    {
                        messages?.map(m => (
                            <div key={m.id} className="my-5 mx-0 md:mx-5">
                                <MessagesCard message={m} handleRead={handleRead} handleDelete={handleDelete} handleModal={handleModal} />
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}