import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChatRoomClient } from "./ChatRoomClient";
async function getCharts(roomId:string)
{
    const res=await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    
    console.log(res.data.messages);
    
    return res.data.messages;
}

export async function ChatRoom({id}:{
    id:string
}){
    const message=await getCharts(id);
    if(!message)return;
    console.log(message);
    
    return <ChatRoomClient id={id} messages={message} />
}