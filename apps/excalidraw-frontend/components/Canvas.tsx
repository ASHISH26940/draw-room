"use client";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "@/windowHook";
import drawInit from "@/app/draw";
import IconButton from "./IconButton";
import { Pencil, RectangleHorizontalIcon, Circle } from "lucide-react";
import { Game } from "@/app/draw/Game";
export enum Tool {
    PENCIL = "pencil",
    RECTANGLE = "rectangle",
    CIRCLE = "circle"
}
export function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { width, height } = useWindowDimensions();
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>(Tool.RECTANGLE);
    useEffect(()=>{
        game?.setTool(selectedTool);
    },[selectedTool,game]);
    useEffect(() => {
        if (canvasRef.current) {
            const g=new Game(canvasRef.current,roomId,socket);
            setGame(g);
            //drawInit(canvasRef.current, roomId, socket);
        }
    }, [canvasRef]);
    console.log("Canvas rendered after check", width, height);

    //console.log("Canvas rendered", window.innerWidth, window.innerHeight);

    return (
        <div style={{ overflow: "hidden" }}>
            <canvas width={width} height={height} ref={canvasRef}></canvas>
            <TopBar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
        </div>
    )
}


function TopBar({
    selectedTool,
    setSelectedTool
}: {
    selectedTool: Tool,
    setSelectedTool: (tool: Tool) => void
}) {
    return <div style={{
        position: "fixed",
        top: 10,
        left: 10,
    }}>
        <div>
                <IconButton
                    icon={<Pencil />}
                    onClick={() => setSelectedTool(Tool.PENCIL)}
                    activated={selectedTool === Tool.PENCIL} // ✅ Fix: Provide a value
                />
                <IconButton
                    icon={<RectangleHorizontalIcon />}
                    onClick={() => setSelectedTool(Tool.RECTANGLE)}
                    activated={selectedTool === Tool.RECTANGLE} // ✅ Fix
                />
                <IconButton
                    icon={<Circle />}
                    onClick={() => setSelectedTool(Tool.CIRCLE)}
                    activated={selectedTool === Tool.CIRCLE} // ✅ Fix
                />
            </div>
    </div>
}