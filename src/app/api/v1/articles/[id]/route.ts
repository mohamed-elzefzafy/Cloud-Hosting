import prisma from "@/utils/db";
import { updateArticleDto } from "@/utils/dtos";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface IProps {
  params: {
    id: string;
  };
}

/**-------------------------------------
 * @desc    get specefic Articles
 * @route   ~/api/articles/:id
 * @method  GET
 * @access  public 
 ----------------------------------------*/
export async function GET(request: NextRequest, { params }: IProps) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        Comments: {
          include : {
            user : {
              select : {userName :true}
            },
            article : true,
          },
          orderBy : {
            createdAt: "desc",
          }
        },
      },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 400 }
      );
    }

    return NextResponse.json({ article }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**-------------------------------------
 * @desc    update Article
 * @route   ~/api/articles/:id
 * @method  PUT
 * @access  private  only admin   
 ----------------------------------------*/
export async function PUT(request: NextRequest, { params }: IProps) {
  try {
    const user = verifyToken(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }
    let article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 400 }
      );
    }

    const body = (await request.json()) as updateArticleDto;

    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: { title: body.title, description: body.description },
    });

    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**-------------------------------------
 * @desc    delete Article
 * @route   ~/api/articles/:id
 * @method  DELETE
 * @access  private  only admin   
 ----------------------------------------*/
export async function DELETE(request: NextRequest, { params }: IProps) {
  try {
    const user = verifyToken(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }
    let article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include : { Comments : true}});
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 400 }
      );
    }
    await prisma.article.delete({ where: { id: parseInt(params.id) } });
    
    const commentIds = article.Comments.map(comment => comment.id);
   await prisma.comment.deleteMany({where : {id : {in : commentIds}}});


    return NextResponse.json({ message: "article deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
