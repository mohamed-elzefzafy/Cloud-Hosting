import prisma from "@/utils/db";
import { LoginDto } from "@/utils/dtos";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/utils/validationSchema";
import { generateToken } from "@/utils/generateToken";
import { JwtPayload } from "@/utils/types";



  /**-------------------------------------
 * @desc    login
 * @route   ~/api/users/login
 * @method  POST
 * @access  public 
 ----------------------------------------*/


 export async function POST(request : NextRequest) {
try {
  const body = await request.json() as LoginDto;
  const validation = loginSchema.safeParse(body);
  if  (!validation.success) {
    return NextResponse.json({message :validation.error.errors[0].message} , {status : 400});
  }
  const user = await prisma.user.findUnique({where : {email : body.email} });
  if (!user) {
return NextResponse.json({message : "invalid email or password"} , {status : 400});
  }
const passwordMatch =  await bcrypt.compare(body.password , user.password);
if (!passwordMatch) {
  return NextResponse.json({message : "invalid email or password"} , {status : 400});
}

const jwtPayLoad : JwtPayload = {id : user.id , isAdmin : user.isAdmin , userName : user.userName };
const token = generateToken(jwtPayLoad);
return NextResponse.json({message : "Authenticated" , token} , {status : 200});
} catch (error) {
  return NextResponse.json({message : "internal server error"},{status : 500});
}
 }