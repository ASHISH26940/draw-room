// import dotenv from 'dotenv';

// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//     throw new Error("JWT_SECRET is not defined in environment variables");
// }

// export { JWT_SECRET };

export const JWT_SECRET=process.env.JWT_SECRET  ?? "secret";