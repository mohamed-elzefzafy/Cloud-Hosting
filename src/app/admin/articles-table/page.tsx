import { getArticles, getArticlesCount } from '@/apiCalls/articleApiCalls';
import Pagination from '@/components/articles/Pagination';
import { articlePerPage } from '@/utils/constants';
import { verifyTokenForClient } from '@/utils/verifyToken';
import { Article } from '@prisma/client';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import DeleteArticleButton from './DeleteArticleButton';
import prisma from '@/utils/db';

interface IAdminArticlesTableProps {
  searchParams: {pageNumber : string}
}
const AdminArticlesTable = async({searchParams : {pageNumber}} : IAdminArticlesTableProps) => {
  const token = cookies().get("jwt")?.value || "";
  if (!token) redirect("/");
  const user = verifyTokenForClient(token);
  if (user?.isAdmin === false) redirect("/");

  const articles : Article[] = await getArticles(pageNumber);
  const count : number = await prisma.article.count();
  const pages = Math.ceil(count / articlePerPage);
  return (
  <section className='p-5'>
    <h1 className='mb-7 text-2xl font-semibold text-gray-700'>Articles</h1>

    <table className='table w-full text-left'>
      <thead className='border-t-2 border-b-2 border-gray-500 lg:text-xl'>
         <tr>
          <th className='p-1 lg:p-2'>Title</th>
          <th className='hidden lg:inline-block'>Created At</th>
          <th>Action</th>
          <th className='hidden lg:inline-block'></th>
         </tr>
      </thead>
      <tbody>
        {articles.map(article => 
                 <tr key={article.id} className='border-b border-t border-gray-300'>
              <td>{article.title}</td>
              <td className='hidden lg:inline-block text-gray-700 font-normal p-3'>{new Date(article.createdAt).toDateString()}</td>
              <td className='p-3'>
                <Link href={`/admin/articles-table/edit/${article.id}`}
                 className='bg-blue-600 rounded-md py-1 px-2 text-white inline-block text-center mb-2 me-2 lg:me-3 hover:bg-blue-800 transition  text-sm'>
                  Edit
                  </Link>
                <DeleteArticleButton articleId={article.id}/>
              </td>
              <td className='hidden lg:inline-block p-3'>
           <Link href={`/articles/${article.id}`} className='text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800'>Read more</Link>
              </td>
                 </tr>

        )}
      </tbody>
    </table>
    <Pagination pages={pages} pagesNumber={parseInt(pageNumber)} route='/admin/articles-table' />
  </section>
  )
}

export default AdminArticlesTable;