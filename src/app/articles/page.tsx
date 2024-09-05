import ArticleItem from '@/components/articles/ArticleItem';
import Pagination from '@/components/articles/Pagination';
import SearchArticleInput from '@/components/articles/SearchArticleInput';
import { TArticles } from '@/utils/types';
import { Metadata } from 'next';
import { resolve } from 'path';




const ArticlesPage = async() => {
  const response  = await fetch("https://jsonplaceholder.typicode.com/posts" , {next : {revalidate : 50}});
  if (!response.ok) {
  throw new Error("failed to fetch articles");
  }
  const articles : TArticles[] = await response.json();
  
  return (
    <section className='container m-auto px-5'>
      <SearchArticleInput/>
        <div  className='flex items-center justify-center flex-wrap gap-7'>
      {articles?.slice(0 , 6).map(art => 
<ArticleItem  article={art} key={art.id}/>

    
      )}
      </div>
      <Pagination/>
    </section>
  )
}

export default ArticlesPage;


export const metadata : Metadata = {
title : "Articles Page",
description : "articles about programming"
}