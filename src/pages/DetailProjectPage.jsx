import React, { useEffect, useState } from "react";
import DetailProjectCard from "../components/DetailProjectCard";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function DetailProjectPage () {
    const [project, setProject] = useState();
    const [loading, setLoading] = useState(true);
    const [{id}] = useState(useParams());
    useEffect(() => {
        const getProject = async () => {
            const proj = await axios.get(`http://localhost:3001/projects/${id}`);
            console.log(proj.data);
            setProject(proj.data);
            setLoading(false);
        };
        getProject();
    }, [id]);
    return (
        <div className="container mx-auto bg-tertiary pt-24">
            <NavLink to='/projects'>
                <div className="text-center">
                    <button className="border border-white bg-tertiary hover:bg-secondary text-white font-semibold py-2 px-4 lg:px-2 m-1 rounded-full w-40">Volver</button>
                </div>
            </ NavLink>
            {
                loading ?
                <Spinner /> :
                <DetailProjectCard project={project} />
            }
        </div>
    )
}