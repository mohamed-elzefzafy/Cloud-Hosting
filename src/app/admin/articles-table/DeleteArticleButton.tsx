"use client";
import request from "@/utils/request";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface IDeleteArticleButtonProps {
    articleId : number;
}
const DeleteArticleButton = ({articleId} : IDeleteArticleButtonProps) => {
    const router = useRouter();

    const handleDeleteArticle = async () => {
        try {
            if (confirm('Are you sure you want to delete this article')) {
                await request.delete(`/api/v1/articles/${articleId}`);
                router.refresh();
                toast.success("Article deleted successfully");
            }
        } catch (error : any) {
           toast.error(error?.response?.data.message);
        }
    }
  return (
<button className="bg-red-600 text-white py-1 px-2 rounded-md text-sm"
 onClick={handleDeleteArticle}>
    Delete
  </button>
  )
}

export default DeleteArticleButton