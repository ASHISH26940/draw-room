"use client";
import { useEffect,useRef } from "react";
import drawInit from "@/app/draw"
export function Canvas({roomId,socket}:{roomId:string,socket:WebSocket}){
    const canvasRef=useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
        if(canvasRef.current){
            drawInit(canvasRef.current,roomId,socket);
        }
    },[canvasRef]);
    return(
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}