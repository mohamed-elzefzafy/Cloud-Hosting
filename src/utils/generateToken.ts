import jwt from "jsonwebtoken";
import { JwtPayload } from "./types";


export const generateToken = (payLoad : JwtPayload) : string => {
  const token = jwt.sign(payLoad , process.env.JWT_SECRET as string , {expiresIn : "30d"});
  return token;
}