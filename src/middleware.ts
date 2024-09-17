import { NextRequest, NextResponse } from "next/server";

export function middleware(request : NextRequest) {
    const authToken = request.cookies.get("jwt");
    const token = authToken?.value as string;
    if (!token) {
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );
    }

}

export const config = {
    matcher: ['/api/v1/users/profile/:path*'],
}