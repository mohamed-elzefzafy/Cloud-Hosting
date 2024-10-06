import { getAllComments } from '@/apiCalls/adminApiCalls';
import request from '@/utils/request';
import { verifyTokenForClient } from '@/utils/verifyToken';
import { Comment } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import DeleteCommentButton from './DeleteCommentButton';

const CommentsTable = async() => {
  const token = cookies().get("jwt")?.value || "";
  if (!token) redirect("/");
  const user = verifyTokenForClient(token);
  if (user?.isAdmin === false) redirect("/");
  console.log(user);
  


  const comments : Comment[] | undefined = await getAllComments(token);
  console.log(comments);
  
  return (
   <section className='p-5'>
    <h1 className='mb-7 text-2xl font-semibold text-gra.'>Comments</h1>
      <table className='table w-full text-left'> 
          <thead className='border-t-2 border-b-2 border-gray-500 lg:text-xl'>
             <tr>
              <th className='p-2'>Comment</th>
              <th className='hidden lg:inline-block p-3'>Created At</th>
              <th>Action</th>
             </tr>
          </thead>
          <tbody>
            {comments?.map(comment => 
          <tr key={comment.id} className='border-b border-t border-gray-300'>
            <td className='p-3 text-gray-700'>{comment.text}</td>
            <td className='p-3 text-gray-700 hidden lg:inline-block font-normal'>
              {new Date(comment.createdAt).toDateString()}
              </td>
              <td> <DeleteCommentButton commentId={comment.id}/>  </td>
          </tr>

            )} 
        </tbody>  

      </table>
   </section>
  )
}

export default CommentsTable;