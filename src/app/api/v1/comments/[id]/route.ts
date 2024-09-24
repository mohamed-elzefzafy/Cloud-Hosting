import prisma from "@/utils/db";
import { UpdateCommentDto } from "@/utils/dtos";
import { TComments } from "@/utils/types";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface IProps {
    params : {id :string}
}
/**-------------------------------------
 * @desc    update comment
 * @route   ~/api/comments/:id
 * @method  PUT
 * @access  private only owner of the comment
 ----------------------------------------*/
 export async function PUT(request : NextRequest ,  { params} : IProps) {
try {
   const body = await request.json() as UpdateCommentDto;
   const comment = await prisma.comment.findUnique({where :  {id : parseInt(params.id)}});
   if (!comment) {
   return NextResponse.json({message : "comment not found"} ,{status: 400}); 
   }
   const user = verifyToken(request);
   if ( !user ||user?.id !== comment?.userId) {
    return NextResponse.json({message : "only user the owner of the comment , access denied"} , {status : 403})
   } 
   const updatedComment = await prisma.comment.update({where : {id : parseInt(params.id)} , data : {text : body.text}})
   return NextResponse.json(updatedComment,{status : 200});
} catch (error) {
    return NextResponse.json({message : "internal server error"},{status : 500}); 
}
 }


 /**-------------------------------------
 * @desc    delete comment
 * @route   ~/api/comments/:id
 * @method  PUT
 * @access  private only owner of the comment or admin
 ----------------------------------------*/
 export async function DELETE(request : NextRequest ,  { params} : IProps) {
    try {
        const comment = await prisma.comment.findUnique({where :  {id : parseInt(params.id)}});
        if (!comment) {
        return NextResponse.json({message : "comment not found"} ,{status: 400}); 
        }

        const user = verifyToken(request);
        if (!user || (user?.id !== comment?.userId && !user?.isAdmin)) {
    return NextResponse.json({message : "only owner of the comment or admin, access denied"} , {status : 401});
        }
        await prisma.comment.delete({where : {id : parseInt(params.id)}});
        return NextResponse.json({message : "comment deleted successfully"},{status : 200});      
        
    } catch (error) {
        return NextResponse.json({message : "internal server error"},{status : 500});   
    }
 }