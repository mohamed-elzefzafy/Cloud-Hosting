import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JwtPayload } from "@/utils/types";

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

    const headerToken = request.headers.get('jwt');

    if (!headerToken) {
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );
    }


    const userFromToken = jwt.verify(
      headerToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

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
