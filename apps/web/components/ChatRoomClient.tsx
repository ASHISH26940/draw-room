"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
    messages,
    id
}:{
    messages:{message:string}[];
    id:string
}){
    const {socket,loading}=useSocket();
    const [chats,setChats]=useState(messages);
    const [currentMessage,setCurrentMessage]=useState("");

    useEffect(()=>{
        if(socket && !loading){
            socket.send(JSON.stringify({
                type:"join_room",
                roomId:id
            }));
            socket.onmessage=(e)=>{
                const parsedData=JSON.parse(e.data);
                if(parsedData.type==="chat"){
                    setChats(c=>[...c,{message:parsedData.message}]) // Correct state update
                }
            }
        }
    },[socket,loading,id]);
    if(!messages)return;
    console.log("message",messages);
    
    return (
        <div>
            {/* ✅ Render `chats` instead of `messages` */}
            {chats?.map((m,idx)=><div key={idx}>{m.message}</div>)}
            
            <input 
                type="text" 
                value={currentMessage} 
                onChange={(e) => setCurrentMessage(e.target.value)}
            />
            
            <button onClick={() => {
                if (socket) {
                    socket.send(JSON.stringify({
                        type: "chat",
                        roomID: id,
                        message: currentMessage // ✅ Fixed: "message" instead of "messages"
                    }));
                }
                setCurrentMessage(""); // Clear input after sending
            }}>
                Click me
            </button>
        </div>
    );
}
