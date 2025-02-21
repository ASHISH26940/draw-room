import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateRoomSchema, CreateUserSchema, SignInSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";
const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/signup", async (req: Request, res: Response) => {
    try {
        const parsedData = CreateUserSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).send({
                message: "Invalid data"
            })
            return;
        };
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
        console.log(hashedPassword);

        const createdUser = await prismaClient.user.create({
            data: {
                email: parsedData.data?.email,
                name: parsedData.data?.name,
                password: hashedPassword
            }
        });
        if (!createdUser) {
            res.status(401).send({
                message: "Failed to create user"
            });
            return;
        }
        res.status(201).send({
            message: "User created",
            userId: createdUser.id,
            user: createdUser
        });
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        });
    }
})

app.post("/signin", async (req: Request, res: Response) => {
    try {
        const parsedData = SignInSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).send({
                message: "Invalid data"
            });
            return;
        }
        const user = await prismaClient.user.findUnique({
            where: {
                email: parsedData.data.email
            }
        });
        if (!user) {
            res.status(401).send({
                message: "Invalid credentials"
            });
            return;
        }
        const isValid = await bcrypt.compare(parsedData.data.password, user.password);
        console.log(isValid);
        if (!isValid) {
            res.status(401).send({
                message: "Invalid password"
            });
            return;
        }
        console.log("test");
        if (!JWT_SECRET) {
            return;
        }
        console.log("http backend signin", JWT_SECRET);


        const token = await jwt.sign({ userId: user?.id }, JWT_SECRET);
        console.log(token);

        res.status(201).send({
            message: "User signed in",
            user: user,
            token: token
        })
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        });
    }
});

app.post("/room", middleware, async (req: Request, res: Response) => {
    try {
        const parsedData = CreateRoomSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).send({
                message: "Invalid data"
            });
            return;
        }
        const userId = req.userId;
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        });
        if (!room) {
            res.status(401).send({
                message: "prisma error"
            })
        }
        res.status(201).send({
            message: "Room created",
            roomId: room.id,
            room: room
        })
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        });
        console.error(err);

    }
});

app.get("/chats/:roomId",async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const messages =await  prismaClient.chat.findMany({
            where: {
                roomId: Number(roomId),
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        });
        if (!messages) {
            res.status(404).send({
                message: "Messages not found"
            })
        }
        console.log(messages);
        
        res.status(201).send({
            messages: messages
        });
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        });
        console.error(err);
    }
});

app.get("/room/:slug",async (req, res) => {
    try {
        const slug = req.params.slug;
        const room = await prismaClient.room.findFirst({
            where: {
                slug: slug
            }
        });
        if(!room){
            res.status(404).send({
                message: "Room not found"
            });
            return;
        }
        res.status(200).send({
           room:room
        });
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        });
        console.error(err);
        
    }
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})