import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectsCard from "../components/ProjectsCard";

export default function ProjectsPage () {
    const [projects, setProjects] = useState();
    const getAllProjects = async () => {
        const allP = await axios.get('http://localhost:3001/projects');
        setProjects(allP.data);
    };
    useEffect(() => {
        getAllProjects();
    }, []);
    return (
        <div className="container mx-auto bg-violet-900">
            <h1 className="text-5xl text-center text-white font-bold uppercase">Proyectos</h1>
            {
                projects?.map(p => (
                    <div key={p.id} className="my-5 mx-5">
                        <ProjectsCard project={p} />
                    </div>
                ))
            }
        </div>
    )
}