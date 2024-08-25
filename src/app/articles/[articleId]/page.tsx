import AddCommentForm from '@/components/comments/AddCommentForm';
import CommentItem from '@/components/comments/CommentItem';
import { TArticles } from '@/utils/types';
import React from 'react'

interface ISingleArticlePageProps {
  params : {articleId : string}
}
const OneArticlePage = async({ params } : ISingleArticlePageProps) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.articleId}`);
  if (!response.ok) {
throw new Error("failed to fetch article");
  }
const article : TArticles = await response.json();
  return (
    <section className='fixed-height container w-full m-auto px-5 pt-8 md:w-3/4'>
      <div className='bg-white p-7 rounded-lg mb-7'>
      <h1 className='text-xl font-bold text-gray-700 mb-2'>{article.title}</h1>
      <div className='text-gray-400'>1-1-2024</div>
      <p className='text-gray-800 text-xl mt-5'>{article.body}</p>
      </div>
      <AddCommentForm/>
      <h4 className='text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7'>Comment</h4>
      <CommentItem/>
      <CommentItem/>
      <CommentItem/>
    </section>
  )
}

export default OneArticlePage;