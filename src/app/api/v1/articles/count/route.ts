import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


 /**-------------------------------------
 * @desc    get articles by search text
 * @route   ~/api/articles/search?serchText=value
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export async function GET(request : NextRequest) {
    try {
        const count = await prisma.article.count();
        return NextResponse.json({count} , {status: 200});
    } catch (error) {
        return NextResponse.json({message : "internal server error"},{status : 500}); 
    }
 }