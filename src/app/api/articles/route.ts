import { articles } from "@/utils/data";
import prisma from "@/utils/db";
import { createArticleDto } from "@/utils/dtos";
import { TArticles } from "@/utils/types";
import { createArticleSchema } from "@/utils/validationSchema";
import { Article, PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";





  /**-------------------------------------
 * @desc    get All Articles
 * @route   ~/api/articles
 * @method  GET
 * @access  public 
 ----------------------------------------*/
export async function GET(request : NextRequest) {
const articles = await prisma.article.findMany();
try {
  return NextResponse.json(articles , {status : 200});
} catch (error) {
  return NextResponse.json({message : "internal server error"},{status : 500});
}

}

  /**-------------------------------------
 * @desc    create Article
 * @route   ~/api/articles
 * @method  POST
 * @access  public 
 ----------------------------------------*/
export async function POST(request : NextRequest) {
  const body = await request.json() as createArticleDto;


 const validation =  createArticleSchema.safeParse(body);
try {
  if (!validation.success) {
    return NextResponse.json({message :validation.error.errors[0].message} , {status : 400});
   }
    const newArticle :Article = await prisma.article.create({
      data : {
        title : body.title,
        description : body.description,
      }
    })
  
  return  NextResponse.json( newArticle , {status : 201});
} catch (error) {
  return NextResponse.json({message : "internal server error"},{status : 500});
}
  
}