import request from "@/utils/request";
import { SingleArticle } from "@/utils/types";
import { Article } from "@prisma/client";
import { toast } from "react-toastify";

export async function getArticles(pageNumber : string | undefined) : Promise<Article[]> {
    const response  = await fetch(`http://localhost:3000/api/v1/articles?pageNumber=${pageNumber}` , {cache : "no-store"});
    if (!response.ok) {
    throw new Error("failed to fetch articles");
    }
  
    return response.json();
  }
  
  export async function getArticlesCount() : Promise<number> {
    const response  = await fetch(`http://localhost:3000/api/v1/articles/count` ,{cache : "no-store"});
    if (!response.ok) {
    throw new Error("failed to get articles count");
    }
  
    const {count} = await response.json() as {count : number};
    return count;
  }
  

  export async function getArticlesBasedOnSearch(searchText : string ) : Promise<Article[]> {
    const response  = await fetch(`http://localhost:3000/api/v1/articles/search?searchText=${searchText}`);
    if (!response.ok) {
    throw new Error("failed to fetch articles");
    }
  
    return response.json();
  }
  

  export async function getSingleArticleById(articleId : string ) : Promise<SingleArticle | undefined> {
    try {
      const response  = await request.get(`/api/v1/articles/${articleId}`);
      // if (!response.data.ok) {
      //   throw new Error("failed to fetch articles");
      //   }
        return response.data.article as SingleArticle;
       
        
    } catch (error : any) {
      toast.error(error?.response.data.message);
    }

  }
  