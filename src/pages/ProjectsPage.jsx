import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectsCard from "../components/ProjectsCard";
import Spinner from "../components/Spinner";

export default function ProjectsPage () {
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
            <h1 className="text-5xl text-center text-white font-bold uppercase">Proyectos</h1>
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