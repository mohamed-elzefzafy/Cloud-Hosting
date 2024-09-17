export type TArticles = {
  userId: number;
  id: number;
  title: string;
  description: string;
};

export type TComments = {
  text : string,
  articleId : number,
  userId : number,
};


export type JwtPayload = {
  id: number;
  isAdmin: boolean;
  userName: string;
};


