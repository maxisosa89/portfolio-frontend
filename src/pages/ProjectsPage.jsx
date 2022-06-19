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
        <div className="container mx-auto">
            <h1 className="text-5xl text-center uppercase">Proyectos</h1>
            {
                projects?.map(p => (
                    <div key={p.id}>
                        <ProjectsCard project={p} />
                    </div>
                ))
            }
        </div>
    )
}