"use client";
import { CommentWithUser } from "@/utils/types";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateCommentModal from "./UpdateCommentModal";
import { useState } from "react";
import { cookies } from "next/headers";
import { verifyTokenForClient } from "@/utils/verifyToken";
import request from "@/utils/request";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CommentItemProps {
  comment : CommentWithUser
  loggedUser : number | undefined;
}
const CommentItem = ({comment : {articleId , user , text  , createdAt , id , userId } , loggedUser} : CommentItemProps) => {
const router = useRouter();

const handleDeleteComment = async() => {
try {
if (confirm('Are you sure you want to delete this comment')) {
  await request.delete(`/api/v1/comments/${id}`);
  router.refresh();
}
} catch (error : any) {
  toast.error(error?.response?.data.message);
}
}
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">
          {user.userName}
        </strong>
        <span className="bg-yellow-700 text-white px-1 rounded-lg">{new Date(createdAt).toDateString()}</span>
        </div>
        <p className="text-gray-800 mb-2"> {text}</p>
        <div className="flex justify-end items-center">
    
      { loggedUser === userId && <>
        <FaEdit className="text-green-600 text-xl cursor-pointer me-3" onClick={()=> setOpenModal(true)}/>
        <FaTrash className="text-red-600 text-xl cursor-pointer" onClick={handleDeleteComment}/>
      </>}
        </div>
        {openModal && <UpdateCommentModal setOpenModal={setOpenModal} commentId={id} text={text}/>}
    </div>
  )
}

export default CommentItem;