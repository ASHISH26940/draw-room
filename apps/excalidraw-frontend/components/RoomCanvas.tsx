"use client";
import { useEffect, useRef,useState } from "react";
import { WS_URL } from "../../web/config";
import { Canvas } from "./Canvas";
export default function RoomCanvas({roomId}:{roomId:string}){    
    const canvasRef=useRef<HTMLCanvasElement>(null);
    const [socket,setSocket]=useState<WebSocket|null>(null);
    if(!canvasRef)return;
    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MGZjYzViYS1jYzJlLTRjZDQtOTcxOS1kY2MyZGY4N2IyYmUiLCJpYXQiOjE3NDA0MDcxMjF9.DXSxjV27ptjdubM1ZYWTmP3UG9tHZBegER5MiSJYZXw`);
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