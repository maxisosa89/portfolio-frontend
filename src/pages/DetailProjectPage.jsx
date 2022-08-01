import React, { useEffect, useState } from "react";
import DetailProjectCard from "../components/DetailProjectCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function DetailProjectPage () {
    const [project, setProject] = useState();
    const [loading, setLoading] = useState(true);
    const [{id}] = useState(useParams());
    useEffect(() => {
        const getProject = async () => {
            const proj = await axios.get(`/projects/${id}`);
            setProject(proj.data);
            setLoading(false);
        };
        getProject();
    }, [id]);
    return (
        <div className="container mx-auto bg-tertiary pt-24">
            {
                loading ?
                <div className="fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2">
                    <Spinner />
                </div> :
                <DetailProjectCard project={project} />
            }
        </div>
    )
}