import { getSingleArticleById } from '@/apiCalls/articleApiCalls';
import AddCommentForm from '@/components/comments/AddCommentForm';
import CommentItem from '@/components/comments/CommentItem';
import { SingleArticle } from '@/utils/types';
import { verifyTokenForClient } from '@/utils/verifyToken';
import { Article } from '@prisma/client';
import { cookies } from 'next/headers';
import { resolve } from 'path';
import React from 'react'


interface ISingleArticlePageProps {
  params : {articleId : string}
}
const OneArticlePage = async({ params } : ISingleArticlePageProps) => {
  const token = cookies().get("jwt")?.value || "";
  const loggedUser = verifyTokenForClient(token);

const article : SingleArticle | undefined = await getSingleArticleById(params.articleId)


  return (
    <section className='fixed-height container w-full m-auto px-5 pt-8 md:w-3/4'>
      <div className='bg-white p-7 rounded-lg mb-7'>
      <h1 className='text-xl font-bold text-gray-700 mb-2'>{article?.title}</h1>
      <div className='text-gray-400'> {new Date(article?.createdAt as Date).toDateString()} </div>
      <p className='text-gray-800 text-xl mt-5'>{article?.description}</p>
      </div>
     {loggedUser &&  <AddCommentForm articleId={article?.id as number}/>}
      <h4 className='text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7'>Comment</h4>
     
     {article?.Comments?.map(comment => <CommentItem key={comment.id} comment={comment} loggedUser={loggedUser?.id}/>)}

    </section>
  )
}

export default OneArticlePage;