import prisma from "@/utils/db";
import { RegisterDto } from "@/utils/dtos";
import { registerSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { JwtPayload } from "@/utils/types";
import { generateToken } from "@/utils/generateToken";


  /**-------------------------------------
 * @desc    register
 * @route   ~/api/users/register
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export async function POST(request : NextRequest) {
  
  try {
    const body = await request.json() as RegisterDto;
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({message :validation.error.errors[0].message} , {status : 400});
    }
    const existUser = await prisma.user.findUnique({where : {email : body.email}});

    if (existUser) {
      return NextResponse.json({message :"the user is already exist"}, {status : 400});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPssword = await bcrypt.hash(body.password , salt)
    const user = await prisma.user.create({
      data : {
        email : body.email,
        password : hashedPssword,
        userName : body.userName
      },
      select : {
        email : true,
        userName : true,
        isAdmin : true,
        id : true,
      }
    })

    const jwtPayLoad : JwtPayload = {id : user.id , isAdmin : user.isAdmin , userName : user.userName };
    const token = generateToken(jwtPayLoad);
   return  NextResponse.json({...user , token }, {status : 201});
  } catch (error) {
    return NextResponse.json({message : "internal server error"},{status : 500});
  }
 }