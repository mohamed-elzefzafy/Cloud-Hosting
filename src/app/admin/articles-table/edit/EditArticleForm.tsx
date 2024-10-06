"use client";
import request from "@/utils/request";
import { Article } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface IEditArticleProps {
   article :Article 
}
const EditArticleForm = ({article} : IEditArticleProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);

const formSubmitHandler = async(e : FormEvent) => {
e.preventDefault();
if (title ==="") return toast.error("title is required");
if (description ==="") return toast.error("description is required");

  try {
    await request.put(`/api/v1/articles/${article.id}` , {title , description});
    toast.success("articles updated successfully");
    router.refresh();
  } catch (error : any) {
    toast.error(error?.response?.data.message)
  }


}
  return (
    <form className="flex flex-col gap-4" onSubmit={formSubmitHandler}>
      <input
        className="mb-4 border rounded p-2 text-xl"
        type="text"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <textarea
        className="mb-4 rounded p-2 lg:text-xl resize-none"
        rows={5}
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className="text-2xl text-white bg-blue-800 hover:bg-blue-900 p-2 rounded-lg font-bold"
      >
        Update
      </button>
    </form>
  );
};

export default EditArticleForm;
