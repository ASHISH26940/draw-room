import {z} from 'zod';

export const CreateUserSchema=z.object({
    email:z.string().min(3).max(255),
    password:z.string(),
    name:z.string()
});

export const SignInSchema=z.object({
    email:z.string().min(3).max(255),
    password:z.string()
})

export const CreateRoomSchema=z.object({
    name:z.string()
});