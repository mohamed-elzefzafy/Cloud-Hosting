import { NextRequest, NextResponse } from "next/server";

export function middleware(request : NextRequest) {
    const authToken = request.cookies.get("jwt");
    const token = authToken?.value as string;
    if (!token) {
    if (request.nextUrl.pathname.startsWith('/api/v1/users/profile/')) {
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
    )} 
      
    } else {
        if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") {
          return NextResponse.redirect(new URL("/", request.url));
        }

    }

}

export const config = {
    matcher: ['/api/v1/users/profile/:path*' , "/login" , "/register"],
}