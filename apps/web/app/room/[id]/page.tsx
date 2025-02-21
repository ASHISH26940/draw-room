import axios from 'axios';
import { BACKEND_URL } from '../../../config';
import { ChatRoom } from '../../../components/ChatRoom';
async function getRoom(slug:string){
    console.log(slug);
    
    const roomDetails= await axios.get(`${BACKEND_URL}/room/${slug}`);
    
    return roomDetails.data.room.id;
}


export default async function chatRoom({
    params
}:{
    params:{
        id:string
    }
}){
    const slug=(await params).id;
    const roomId=await getRoom(slug);
    return <ChatRoom id={roomId}/>
}