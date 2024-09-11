import prisma from "@/utils/db";
import { updateArticleDto } from "@/utils/dtos";
import { NextRequest, NextResponse } from "next/server";


interface IProps {
    params : {
      id : string;
    }
  }

  /**-------------------------------------
 * @desc    get specefic Articles
 * @route   ~/api/articles/:id
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export async function GET(request : NextRequest ,  { params} : IProps) {
  
try {
  const article = await prisma.article.findUnique({where: {id: parseInt(params.id)}})
if (!article) {
  return NextResponse.json({message : "article not found"} ,{status: 400 });
}

return NextResponse.json({article} ,{status: 200 });

} catch (error) {
  return NextResponse.json({message : "internal server error"},{status : 500});
}
}


  /**-------------------------------------
 * @desc    update Article
 * @route   ~/api/articles/:id
 * @method  PUT
 * @access  public 
 ----------------------------------------*/
 export async function PUT(request : NextRequest ,  { params} : IProps) {
try {
  let article = await prisma.article.findUnique({where : {id : parseInt(params.id)}});
if (!article) {
  return NextResponse.json({message : "article not found"} ,{status: 400 });
}

const body = (await request.json()) as updateArticleDto

const updatedArticle = await prisma.article.update({where :
   {id : parseInt(params.id)} ,
    data : {title : body.title , description : body.description}})

return NextResponse.json(updatedArticle ,{status: 200 });
} catch (error) {
  return NextResponse.json({message : "internal server error"},{status : 500});
}

}


  /**-------------------------------------
 * @desc    delete Article
 * @route   ~/api/articles/:id
 * @method  DELETE
 * @access  public 
 ----------------------------------------*/
 export async function DELETE(request : NextRequest ,  { params} : IProps) {
try {
  let article = await prisma.article.findUnique({where : {id : parseInt(params.id)}});
  if (!article) {
    return NextResponse.json({message : "article not found"} ,{status: 400 });
  }
  await prisma.article.delete({where :{id : parseInt(params.id)}});
  
  return NextResponse.json({message : "article deleted"}  ,{status: 200 });
} catch (error) {
  return NextResponse.json({message : "internal server error"},{status : 500});
}
  
  }