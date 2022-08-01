import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function DashboardPage () {
    const [messages, setMessages] = useState();
    const [unreadMessages, setUnreadMessages] = useState();
    const [projects, setProjects] = useState();
    const [techs, setTechs] = useState();
    const [loading, setLoading] = useState(true);
    async function getData(){
        const token = localStorage.getItem("tokenPortfolioMS");
        const m = await axios.get('/messages', { headers: { Authorization: token } });
        const p = await axios.get('/projects');
        const t = await axios.get('/techs');
        setMessages(m.data.length);
        setUnreadMessages(m.data.filter(m => !m.read).length);
        setProjects(p.data.length);
        setTechs(t.data.length);
        setLoading(false);
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="container mx-auto bg-tertiary pt-24">
            {
                loading ?
                <div className="fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2">
                    <Spinner />
                </div> :
                <div className="flex flex-wrap justify-center">
                    <div className="w-full sm:w-40">
                        <p className="text-white font-semibold text-2xl text-center">Mensajes</p>
                        <div className="flex justify-center">
                            <NavLink to="/admin/messages">
                                <button
                                    className="w-28 h-28 m-2 border border-white bg-secondary hover:bg-tertiary text-white font-semibold text-2xl rounded-full"
                                >
                                    { `${unreadMessages}/${messages}`}
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="w-full sm:w-40">
                        <p className="text-white font-semibold text-2xl text-center">Proyectos</p>
                        <div className="flex justify-center">
                            <NavLink to="/admin/projects">
                                <button
                                    className="w-28 h-28 m-2 border border-white bg-secondary hover:bg-tertiary text-white font-semibold text-2xl rounded-full"
                                >
                                    {projects}
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="w-full sm:w-40">
                        <p className="text-white font-semibold text-2xl text-center">Techs</p>
                        <div className="flex justify-center">
                            <NavLink to="/admin/techs">
                                <button
                                    className="w-28 h-28 m-2 border border-white bg-secondary hover:bg-tertiary text-white font-semibold text-2xl rounded-full"
                                >
                                    {techs}
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}