import prisma from "@/utils/db";
import { CreateCommentDto } from "@/utils/dtos";
import { createCommenSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";


/**-------------------------------------
 * @desc    create comment
 * @route   ~/api/comments
 * @method  POST
 * @access  private logged user him self
 ----------------------------------------*/
 export async function POST (request : NextRequest) {
    try {
        const user = verifyToken(request);
        if (!user) {
        return NextResponse.json({message : "only logged user , access denied"} , {status : 401})
        }

        const body = await request.json() as CreateCommentDto;
        const validation = createCommenSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({message : validation.error.errors[0].message} , {status : 400});
        }
        const newComment = await prisma.comment.create({
        data : {
            text : body.text,
            articleId : body.articleId,
            userId : user?.id as number,
         }});
     
       return NextResponse.json(newComment,{status : 201});
    } catch (error) {
        return NextResponse.json({message : "internal server error"},{status : 500}); 
    }
 }


 
/**-------------------------------------
 * @desc    create comment
 * @route   ~/api/comments
 * @method  POST
 * @access  private only admin
 ----------------------------------------*/
 export async function GET(request : NextRequest) {
    try {
        const user = verifyToken(request);
        if (!user || !user.isAdmin) {
       return NextResponse.json({message : "only admin  , access denied"} , {status : 403})
        }
        const comments = await prisma.comment.findMany();
        return NextResponse.json(comments,{status : 200});
       
    } catch (error) {
        return NextResponse.json({message : "internal server error"},{status : 500}); 
    }
 }