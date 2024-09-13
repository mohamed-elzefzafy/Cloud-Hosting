import { NextRequest, NextResponse } from "next/server";

export function middleware(request : NextRequest) {
    const authToken = request.headers.get('jwt');

    if (!authToken) {
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );
    }

}

export const config = {
    matcher: ['/api/v1/users/profile/:path*'],
}