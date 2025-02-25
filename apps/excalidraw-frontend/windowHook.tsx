"use client";
import { useEffect, useState } from "react";

type WindowDimensions = {
    width: number|undefined;
    height: number|undefined;
}

const useWindowDimensions = () => {
    const [WindowDimensions, setWindowDimensions] = useState<WindowDimensions>({
        width:undefined,
        height:undefined
    });
    useEffect(()=>{
        function handleResize():void{
            setWindowDimensions({
                width:window.innerWidth,
                height:window.innerHeight
            });
        }
        handleResize();
        window.addEventListener("resize",handleResize);
        return ()=>window.removeEventListener("resize",handleResize);
    },[]);
    return WindowDimensions;
};

export default useWindowDimensions;