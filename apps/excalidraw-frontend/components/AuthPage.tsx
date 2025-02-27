"use client";
import { useState } from "react";
import axios from "axios";
import { HTTP_BACKEND } from "@/config";
import { useRouter } from "next/navigation";
import { sign } from "crypto";

export function AuthPage({ isSignIn }: { isSignIn: boolean }) {
    const router=useRouter();
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        name: "",
        roomName: ""
    });
    console.log("isSignIn:", formValues);
    
    const handleAuth = async () => {
        try {
            const endpoint = isSignIn ? "/signin" : "/signup";
            const payload = isSignIn ? { email: formValues.email, password: formValues.password } : formValues;
            const response = await axios.post(`${HTTP_BACKEND}${endpoint}`, payload);
            if(!response) {
                console.log("No response");
                return;
            }
            console.log("Response:", response);
            
            // Handle success (e.g., redirect, show message)
            if(isSignIn){
                const token= response.data.token as string;
                console.log(typeof token);
                
                console.log("Token:", token);
                localStorage.setItem("token", token);
                const name= response.data.user.name as string;
                console.log("Name:", name);
                const res=await axios.post(`${HTTP_BACKEND}/room`,{name},{
                    headers:{
                        Authorization:token
                    }
                });
                if(!res){
                    console.log("No response");
                    return;
                };
                const roomId=res.data.roomId as string;
                console.log("RoomId:", roomId);
                // const chats=await axios.post(`${HTTP_BACKEND}/chats/${roomId}`,{roomName:formValues.roomName},
                // {
                //     headers:{
                //         Authorization:token
                //     }
                // });
                // if(!chats){
                //     return;
                // }
                router.push(`/canvas/${roomId}`);
            }else{
                router.push("/signin");
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle error (e.g., display error message)
        }
    };

    

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="p-4 bg-white rounded shadow-lg">
                {/* Name Field (Only for Sign-Up) */}
                {!isSignIn && (
                    <div className="p-2">
                        <input
                            value={formValues.name}
                            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                            type="text"
                            placeholder="Full Name"
                            className="border p-2 rounded w-full"
                        />
                    </div>
                )}
                <div className="p-2">
                    <input
                        value={formValues.email}
                        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                        type="email"
                        placeholder="Email"
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="p-2">
                    <input
                        value={formValues.password}
                        type="password"
                        onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                        placeholder="Password"
                        className="border p-2 rounded w-full"
                    />
                </div>
                {!isSignIn && (
                    <div className="p-2">
                        <input
                            value={formValues.roomName}
                            onChange={(e) => setFormValues({ ...formValues, roomName: e.target.value })}
                            type="text"
                            placeholder="Room Name"
                            className="border p-2 rounded w-full"
                        />
                    </div>
                )}
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
                    onClick={handleAuth}
                >
                    {isSignIn ? "Sign In" : "Sign Up"}
                </button>
            </div>
        </div>
    );
}
