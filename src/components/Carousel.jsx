import React, { useEffect, useState } from "react";

export default function Carousel ({project}) {
    const [count, setCount] = useState(0);
    const [currentImg, setCurrentImg] = useState(project.projectImg[count]);
    function handleSlide(e) {
        e.preventDefault();
        if (e.target.value === "prev"){
            count > 0 ? 
            setCount(count-1) :
            setCount(project.projectImg.length-1)
        } else if (e.target.value === "next") {
            count < project.projectImg.length-1 ? 
            setCount(count+1) :
            setCount(0)
        } else if (parseInt(e.target.value) >= 0 && parseInt(e.target.value) < project.projectImg.length) {
            setCount(parseInt(e.target.value));
        }
    };
    useEffect(() => {
        setCurrentImg(project.projectImg[count]);
    }, [count, project.projectImg]);
    return (
        <div className="relative grid h-96 w-full">
            <img className="h-96 w-full object-cover" src={currentImg} alt="not found" />
            <div className="flex justify-between self-end absolute w-full">
                <button
                    className="w-10 h-10 m-2 border border-white bg-secondary hover:bg-tertiary text-white font-semibold text-2xl rounded-full"
                    value="prev"
                    onClick={handleSlide}>
                    {'<'}
                </button>
                <div className="flex justify-center self-center">
                    {
                        project.projectImg.map((e, index) => (
                            <button
                                className={`w-4 h-4 m-2 border border-white bg-secondary hover:bg-tertiary text-white font-semibold text-2xl flex align-middle justify-center rounded-full ${index === count && 'bg-primary hover:bg-primary'}`}
                                id={index}
                                value={index}
                                key={index}
                                onClick={handleSlide}>
                            </button>
                        ))
                    }
                </div>
                <button
                    className="w-10 h-10 m-2 border border-white bg-secondary hover:bg-tertiary text-white font-semibold text-2xl rounded-full"
                    value="next"
                    onClick={handleSlide}>
                    {'>'}
                </button>
            </div>
        </div>
    )
}