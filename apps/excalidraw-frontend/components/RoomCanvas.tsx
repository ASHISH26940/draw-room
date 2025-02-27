"use client";
import { useEffect, useRef,useState } from "react";
import { WS_URL } from "../../web/config";
import { Canvas } from "./Canvas";
export default function RoomCanvas({roomId}:{roomId:string}){    
    const canvasRef=useRef<HTMLCanvasElement>(null);
    const [socket,setSocket]=useState<WebSocket|null>(null);
    if(!canvasRef)return;
    const token=localStorage.getItem("token");
    if(!token)return;
    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=${token}`);
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
        <Canvas roomId={roomId} socket={socket} /> 
    )
}