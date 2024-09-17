import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import { updateUserDto } from "@/utils/dtos";
import bcrypt from "bcryptjs";
import { registerSchema, updateUserSchema } from "@/utils/validationSchema";



interface Iprops {
  params: { id: string };
}
/**-------------------------------------
 * @desc    delete user
 * @route   ~/api/users/:id
 * @method  DELETE
 * @access  private logged user him self
 ----------------------------------------*/
export async function DELETE(request: NextRequest, { params }: Iprops) {
  try {

    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }

       const userFromToken = verifyToken(request)
    if (!userFromToken) {
      return NextResponse.json(
        { message: "invalid token, access denied" },
        { status: 401 }
      );
    }

    if (userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "only the logged user can delete their account, forbidden" },
        { status: 403 }
      );
    }

    await prisma.user.delete({ where: { id: parseInt(params.id) } });

    return NextResponse.json(
      { message: "user deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**-------------------------------------
 * @desc    delete user
 * @route   ~/api/users/:id
 * @method  GET
 * @access  private logged user him self
 ----------------------------------------*/
export async function GET(request : NextRequest , {params} : Iprops) {
  try {
    const user = await prisma.user.findUnique({where : {id : parseInt(params.id) } ,select : {
      id: true,
      userName: true,
      email: true,
      isAdmin: true,
      createdAt: true,
      }});
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }
    const userFromToken = verifyToken(request);
    if (!userFromToken || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you are not allowed, forbidden" },
        { status: 403 }
      );
    } 
   return NextResponse.json(user , {status : 200});
  } catch (error) {
    return NextResponse.json({message : "internal server error"},{status : 500});
  }
}

/**-------------------------------------
 * @desc    update user
 * @route   ~/api/users/:id
 * @method  PUT
 * @access  private logged user him self
 ----------------------------------------*/
 export async function PUT(request : NextRequest ,  { params} : Iprops) {
  try {
    const user = await prisma.user.findUnique({where : {id : parseInt(params.id)}});
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }
    const userFromToken = verifyToken(request);
    if (!userFromToken || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you are not allowed, forbidden" },
        { status: 403 }
      );
    }
    const body = await request.json() as updateUserDto;
    const validation = updateUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message : validation.error.errors[0].message} , {status : 400});
    }

  if (body.password) {
  const salt = await bcrypt.genSalt(10);
   body.password = await bcrypt.hash(body.password , salt);
  }
    const updatedUser = await prisma.user.update({where : {id : user.id} , data : {
      email  : body.email,
      userName : body.userName,
      password :body.password,
    }})
    const  {password , ...updateUserSecured} = updatedUser;
    return NextResponse.json(updateUserSecured , {status : 200});
  } catch (error) {
    return NextResponse.json({message : "internal server error"},{status : 500});
  }
 }