import axios from "axios";
import { HTTP_BACKEND } from "@/config";
export async function getExistingShapes(roomId:string){
    const res=await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    if(!res)return;
    const data=res.data.messages;
    if(!data)return;
    const shapes=data.map((x:{message:string})=>{
        const messageData=JSON.parse(x.message);
        return messageData.shape;
    });
    return shapes;
}