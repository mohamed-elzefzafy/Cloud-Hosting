import { getArticlesBasedOnSearch } from "@/apiCalls/articleApiCalls";
import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@prisma/client";
import { string } from "zod";

interface IProps {
  searchParams :  {
    searchText : string;
  }
}
const SearchArticlePage = async({searchParams : {searchText}} : IProps) => {
 const articles : Article[] = await getArticlesBasedOnSearch(searchText);
  
  return (
    <section className="fixed-height container m-auto px-5">
   <h1 className="text-2xl font-bold my-3 text-gray-800">
  {articles.length > 0 ?  <> Articles based on : <span className="ms-1 text-green-700 text-3xl font-bold capitalize">{searchText}</span> </> :
  <span className="ms-1 text-red-700 text-3xl font-bold">There is no Articles based on  {searchText}...</span> 
  }
    </h1>    
<div className="flex items-center justify-center flex-wrap gap-7">
{articles.map(article => <ArticleItem  key={article.id} article={article}/>)}
</div>
</section>

  )
}

export default SearchArticlePage;