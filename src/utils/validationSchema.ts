import { z } from "zod";

export const createArticleSchema =  z.object({
  title : z.string({required_error : "title is required" , invalid_type_error : "title type is string"})
  .min(2 ,"title must be more than 2 characters").max(200 , {message : "max title length is 200"}),
  description : z.string().min(10),
})

export const registerSchema =  z.object({
  email : z.string().min(3).max(200).email(),
  userName : z.string().min(2).max(100),
  password : z.string().min(6),
})

export const updateUserSchema =  z.object({
  email : z.string().min(3).max(200).email().optional(),
  userName : z.string().min(2).max(100).optional(),
  password : z.string().min(6).optional(),
})



export const loginSchema =  z.object({
  email : z.string().min(3).max(200).email(),
  password : z.string().min(6),
})

export const createCommenSchema =  z.object({
  text : z.string().min(2).max(500),
  articleId : z.number(),
})
