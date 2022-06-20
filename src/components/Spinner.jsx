import React from "react";

export default function Spinner () {
    return (
        <div className="flex justify-center m-8">
            <div style={{borderTopColor:"transparent"}}
                className="text-center w-16 h-16 border-4 border-primary border-solid rounded-full animate-spin"></div>
        </div>
    )
}