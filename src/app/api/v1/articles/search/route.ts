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
        const searchText = request.nextUrl.searchParams.get('searchText');
        let articles;
        if (searchText) {
            articles = await prisma.article.findMany({
                where : {
                    title : {
                        startsWith : searchText,
                        mode : "insensitive"
                    }
                }
            })
        } else {
            articles = await prisma.article.findMany({take : 6});
        }
        return NextResponse.json(articles,{status : 200});
    } catch (error) {
        return NextResponse.json({message : "internal server error"},{status : 500});  
    }
 }