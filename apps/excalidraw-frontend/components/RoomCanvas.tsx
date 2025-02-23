"use client";
import { useEffect, useRef,useState } from "react";
import { WS_URL } from "../../web/config";
import { Canvas } from "./Canvas";
export default function RoomCanvas({roomId}:{roomId:string}){    
    const canvasRef=useRef<HTMLCanvasElement>(null);
    const [socket,setSocket]=useState<WebSocket|null>(null);
    if(!canvasRef)return;
    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNGM2MDRmNS0yYzE2LTQxYzAtYjRkMC0zNjJkNDcwN2IwNWQiLCJpYXQiOjE3NDAzMzA4NjJ9.imcn9OjheXa5L0iDttLvwXh7QWd6zie_D3xzEFTtvs8`);
        ws.onopen=()=>{
            setSocket(ws);
            ws.send(JSON.stringify({
               type:"join_room",
               roomId
            }));
            
        }
    },[]);

    if(!socket){
        return <div>Loading...</div>
    }
    return(
        <div>
            <Canvas roomId={roomId} socket={socket} />
            <canvas ref={canvasRef} width={2000} height={2000}></canvas>
            <div className="absolute bottom-0 right-0">
                <div className=" bg-white">Rect</div>
                <div className=" bg-white text"></div>
            </div>
        </div>
    )
}