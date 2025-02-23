"use client";
export function AuthPage(
    {isSignIn}:{
        isSignIn: boolean
    }
){
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className=" p-2 m-2 bg-white rounded ">
                <div className="p-2"><input type="text" placeholder="email"></input></div>
                <div className="p-2"><input type="password" placeholder="password"></input></div>
                 
                
                <button className=" text-black" onClick={
                    () => {
                        console.log("clicked")
                    }
                }>{isSignIn ? "Sign In" : "Sign Up"}</button>
            </div>
        </div>
    )
}