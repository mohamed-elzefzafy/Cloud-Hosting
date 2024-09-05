import { z } from "zod";

export const createArticleSchema =  z.object({
  title : z.string({required_error : "title is required" , invalid_type_error : "title type is string"})
  .min(2 ,"title must be more than 2 characters").max(200 , {message : "max title length is 200"}),
  description : z.string().min(10),
})
