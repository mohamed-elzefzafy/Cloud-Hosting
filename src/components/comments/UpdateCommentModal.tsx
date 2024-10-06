"use client";
import request from "@/utils/request";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

interface UpdateCommentModalProps {
  setOpenModal : Dispatch<SetStateAction<boolean>>;
  text : string;
  commentId : number;
}
const UpdateCommentModal = ({setOpenModal ,  commentId , text} : UpdateCommentModalProps) => {
    const router = useRouter();
  const [updatedText, setUpdatedText] = useState(text);

  const submitHandler = async (e : FormEvent) => {
    e.preventDefault();
    if (updatedText === "") return toast.warning("Please write a comment");
    try {
      await request.put(`/api/v1/comments/${commentId}` , {text:updatedText}); 
      router.refresh();
      setOpenModal(false); 
      setUpdatedText("");
    } catch (error : any) {
      toast.error(error?.response?.data.message);
    }
  }
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-10 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="w-11/12 lg:w-2/4 bg-white rounded-lg p-3">
        <div className="flex items-start justify-end">
          <IoMdCloseCircleOutline className="text-red-500 cursor-pointer text-3xl" onClick={()=> setOpenModal(false)}/>
        </div>

        <form onSubmit={submitHandler}>
            <input type="text"  placeholder="Add comment..." value={updatedText}
           onChange={(e)=> setUpdatedText(e.target.value)}  className="text-xl rounded-lg p-2 w-full bg-white mb-2 mt-5"/>
      <button type="submit" className="bg-green-700 w-full text-white mt-2 p-1 text-xl
       rounded-lg hover:bg-green-900 transition">
                Edit
     </button>
        </form>

        </div>
    </div>
  )
}

export default UpdateCommentModal;