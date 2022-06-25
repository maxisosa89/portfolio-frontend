import React, { useEffect, useState } from "react";
import axios from "axios";
import TechsCard from "../../components/admin/TechsCardAdmin";
import Spinner from "../../components/Spinner";

export default function ListTechsPage () {
    const [techs, setTechs] = useState();
    const [loading, setLoading] = useState(true);
    const getAllTechs = async () => {
        const allT = await axios.get('http://localhost:3001/techs');
        console.log(allT.data);
        setTechs(allT.data);
        setLoading(false);
    };
    useEffect(() => {
        getAllTechs();
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
                techs?.map(t => (
                    <div key={t.id} className="my-5 mx-0 md:mx-5">
                        <TechsCard tech={t} />
                    </div>
                ))
            }
        </div>
    )
}