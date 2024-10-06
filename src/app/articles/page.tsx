import { getArticles, getArticlesCount } from '@/apiCalls/articleApiCalls';
import ArticleItem from '@/components/articles/ArticleItem';
import Pagination from '@/components/articles/Pagination';
import SearchArticleInput from '@/components/articles/SearchArticleInput';
import { articlePerPage } from '@/utils/constants';
import prisma from '@/utils/db';
import { Article, Prisma } from '@prisma/client';
import { Metadata } from 'next';


interface ArticlePageProps {
  searchParams : {pageNumber : string}
}

const ArticlesPage = async({searchParams} : ArticlePageProps) => {
  const {pageNumber} = searchParams;
  const response  = await fetch(`http://localhost:3000/api/v1/articles?pageNumber=${pageNumber}`);
  if (!response.ok) {
  throw new Error("failed to fetch articles");
  }
  const articles : Article[] = await getArticles(pageNumber);
  const count :number = await prisma.article.count();
  
  const pages = Math.ceil(count / articlePerPage);
  
  return (
    <section className='container m-auto px-5'>
      <SearchArticleInput/>
        <div  className='flex items-center justify-center flex-wrap gap-7'>
      {articles?.map(art => 
<ArticleItem  article={art} key={art.id}/>

    
      )}
      </div>
      <Pagination pagesNumber={parseInt(pageNumber)} pages={pages} route='/articles'/>
    </section>
  )
}

export default ArticlesPage;


export const metadata : Metadata = {
title : "Articles Page",
description : "articles about programming"
}