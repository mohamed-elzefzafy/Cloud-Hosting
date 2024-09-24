import { Article } from "@prisma/client";

export async function getArticles(pageNumber : string | undefined) : Promise<Article[]> {
    const response  = await fetch(`http://localhost:3000/api/v1/articles?pageNumber=${pageNumber}`);
    if (!response.ok) {
    throw new Error("failed to fetch articles");
    }
  
    return response.json();
  }
  
  export async function getArticlesCount() : Promise<number> {
    const response  = await fetch(`http://localhost:3000/api/v1/articles/count`);
    if (!response.ok) {
    throw new Error("failed to get articles count");
    }
  
    const {count} = await response.json() as {count : number};
    return count;
  }
  