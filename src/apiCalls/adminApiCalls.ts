import { Comment } from "@prisma/client";


export async function getAllComments (token : string) : Promise<Comment[] | undefined> {
try {
    const response = await fetch("http://localhost:3000/api/v1/comments" , {headers : {Cookie : `jwt=${token}`}});

    if (!response.ok) {
        throw new Error("failed to get comments");
        }
    return response.json();
  
} catch (error) {
    
}
}