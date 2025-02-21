"use client";
import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket(){
    const [loading,setLoading]=useState(true);
    const [socket,setSocket]=useState<WebSocket>();
    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDIwYTZkZS1mNDE2LTQzYTEtOTEyMC0zOGQwZGE3YzQ2NDgiLCJpYXQiOjE3NDAxNDgwODF9.jva0lPijEboW_cm_Ti8Ifpb0LoOGEa1yLYeqmNC1Udg`);
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws);
        }
    },[])
    return{
        socket,
        loading
    }
}