export interface createArticleDto  {
  title: string,
  description: string,
  }
  

export interface updateArticleDto  {
  title?: string,
  description?: string,
  }
  
  export interface RegisterDto  {
    email: string,
    password: string, 
    userName: string, 
    }
    
  export interface LoginDto  {
    email: string,
    password: string, 
    }
    
    export interface updateUserDto  {
      email?: string,
      password?: string, 
      userName?: string, 
      }
      
      export interface CreateCommentDto{
        text : string,
        articleId : number,
      }