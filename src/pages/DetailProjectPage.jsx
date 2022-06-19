import React, { useEffect, useState } from "react";
import DetailProjectCard from "../components/DetailProjectCard";
import axios from "axios";

export default function DetailProjectPage () {
    const [project, setProject] = useState();
    const getProject = async () => {
        const proj = await axios.get('http://localhost:3001/projects');
        console.log(proj.data);
        setProject(proj.data);
    };
    useEffect(() => {
        getProject();
    }, []);
    return (
        <div className="container mx-auto bg-violet-900 pt-24">
            <h1 className="text-5xl text-center text-white font-bold uppercase">Detail Project</h1>
            <DetailProjectCard />
        </div>
    )
}