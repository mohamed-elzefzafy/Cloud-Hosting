import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { JwtPayload } from "./types";

export function verifyToken (request : NextRequest) {
try {
    const jwtToken = request.cookies.get("jwt");
    const token = jwtToken?.value as string;
    if (!token) return null;
    const jwtPayload = jwt.verify(token , process.env.JWT_SECRET as string) as JwtPayload;
    return jwtPayload;
} catch (error) {
    return null;
}
}


export function verifyTokenForClient (token : string) : JwtPayload | null {
    try {
        const userPayload = jwt.verify(token , process.env.JWT_SECRET as string) as JwtPayload;
        
        if (!userPayload) return null;
        return userPayload;
    } catch (error) {

        return null;
    }
    }