import { getSingleArticleById } from "@/apiCalls/articleApiCalls";
import { verifyTokenForClient } from "@/utils/verifyToken";
import { Article } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditArticleForm from "../EditArticleForm";


interface IEditArticlePageProp {
    params : {id : string}
}
const EditArticlePage = async({params} : IEditArticlePageProp) => {
    const token = cookies().get("jwt")?.value || "";
    if (!token) redirect("/");
    const user = verifyTokenForClient(token);
    if (user?.isAdmin === false) redirect("/");

    const article : Article | undefined = await getSingleArticleById(params.id);

  
  return (
   <section className="fixed-height flex items-center justify-center px-5 lg:px-20">
    <div className="shadow p-4 bg-purple-200 rounded w-full">
       <h2 className="text-2xl text-green-700 font-semibold mb-4">Edit Article</h2>
      {article &&  <EditArticleForm article={article}/>}
    </div>
   </section>
  )
}

export default EditArticlePage;