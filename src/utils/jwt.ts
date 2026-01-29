import jwt from "jsonwebtoken";


const SECRET = "SUPER_SECRET_KEY";


export const generateToken = (payload: object) => {
return jwt.sign(payload, SECRET, { expiresIn: "1d" });
};


export const verifyToken = (token: string) => {
return jwt.verify(token, SECRET);
};