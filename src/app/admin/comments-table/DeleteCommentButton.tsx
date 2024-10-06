"use client";
import request from "@/utils/request";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface IDeleteCommentButtonProps {
    commentId : number;
}
const DeleteCommentButton = ({commentId} : IDeleteCommentButtonProps) => {
    const router = useRouter();

    const handleDeleteComment = async () => {
        try {
            if (confirm('Are you sure you want to delete this comment')) {
                await request.delete(`/api/v1/comments/${commentId}`);
                router.refresh();
                toast.success("Comment deleted successfully");
            }
        } catch (error : any) {
           toast.error(error?.response?.data.message);
        }
    }
  return (
<button className="bg-red-600 text-white py-1 px-2 rounded-md text-sm"
 onClick={handleDeleteComment}>
    Delete
  </button>
  )
}

export default DeleteCommentButton;