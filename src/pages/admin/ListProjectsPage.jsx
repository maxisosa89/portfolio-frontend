import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectsCard from "../../components/admin/ProjectsCardAdmin";
import Spinner from "../../components/Spinner";

export default function ListProjectsPage () {
    const [projects, setProjects] = useState();
    const [loading, setLoading] = useState(true);
    const getAllProjects = async () => {
        const allP = await axios.get('http://localhost:3001/projects');
        setProjects(allP.data);
        setLoading(false);
    };
    useEffect(() => {
        getAllProjects();
    }, []);
    return (
        <div className="container mx-auto bg-tertiary pt-24">
            <div className="flex justify-center">
                <img
                    src="https://res.cloudinary.com/dg7fmdsmw/image/upload/v1656061619/Portfolio/iconos/add_oeqefo.png"
                    alt="Agregar"
                    className="relative inset-x-2 inset-y-px w-11 h-11"
                />
            </div>
            {
                loading ?
                <div className="fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2">
                    <Spinner />
                </div> :
                projects?.map(p => (
                    <div key={p.id} className="my-5 mx-0 md:mx-5">
                        <ProjectsCard project={p} />
                    </div>
                ))
            }
        </div>
    )
}