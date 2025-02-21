"use client";
import React,{useState} from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
function page() {
  const [roomId,setRoomId] = useState<string>('');
  const router=useRouter();
  return (
    <div style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'100vh',
      width:'100vw'
    }}>
      <input type="text" value={roomId} onChange={(e)=>{setRoomId(e.target.value)}} placeholder='Room id'></input>
      <button style={{padding:"10"}} onClick={(e)=>{
        router.push(`/room/${roomId}`);
      }}>Join Room</button>
    </div>
  )
}

export default page