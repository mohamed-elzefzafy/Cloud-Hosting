"use client";
import request from "@/utils/request";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface AddCommentFormProps {
  articleId: number;
}

const AddCommentForm = ({articleId} : AddCommentFormProps) => {
  const [text, setText] = useState("");
  const router = useRouter();

const formSubmitHandler = async(e : FormEvent) => {
e.preventDefault();
if (text === "") return toast.error("please write a comment ");
try {
  await request.post("/api/v1/comments" , {text , articleId});
  router.refresh();
setText("");
} catch (error : any) {
  toast.error(error?.response?.data.message)
}

}
  return (
    <form  onSubmit={formSubmitHandler}>
      <input
        className="rounded-lg text-xl p-2 w-full bg-white focus:shadow-md"
        type="text"
        placeholder="Add a comment"
        value={text}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      />
      <button type="submit" className="bg-green-700 text-white mt-2 p-1 w-min rounded-lg hover:bg-green-900 transition">Comment</button>
    </form>
  );
};

export default AddCommentForm;
