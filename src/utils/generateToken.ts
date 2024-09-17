import jwt from "jsonwebtoken";
import { JwtPayload } from "./types";
import { serialize } from "cookie";


export const generateToken = (payLoad : JwtPayload) : string => {
  const token = jwt.sign(payLoad , process.env.JWT_SECRET as string , {expiresIn : "30d"});
  return token;
}


export function setCookie (jwtPayload : JwtPayload) {
const token = generateToken(jwtPayload);
const cookie = serialize("jwt" , token , {
  httpOnly : true,
  secure : process.env.NODE_ENV === "production",
  sameSite : "strict",
  path : "/",
  maxAge : 60 * 60 * 24 * 30,
})

return cookie;
}