import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



  /**-------------------------------------
 * @desc    logout
 * @route   ~/api/v1/users/logout
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export async function GET(request : NextRequest) {
    try {
        cookies().delete("jwt");
      return  NextResponse.json({message : "logged out" }, {status : 200});
    } catch (error) {
        return NextResponse.json({message : "internal server error"},{status : 500});
    }
 }