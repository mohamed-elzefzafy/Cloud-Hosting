"use client";
import request from "@/utils/request";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const AddArticleForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
const formSubmitHandler = async(e : FormEvent) => {
e.preventDefault();
if (title ==="") return toast.error("title is required");
if (description ==="") return toast.error("description is required");

  try {
    await request.post("/api/v1/articles" , {title , description});
    setTitle("");
    setDescription("");
    toast.success("articles added successfully");
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
        placeholder="Enter Article Title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <textarea
        className="mb-4 rounded p-2 lg:text-xl resize-none"
        rows={5}
        placeholder="Enter Article Description"
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className="text-2xl text-white bg-blue-800 hover:bg-blue-900 p-2 rounded-lg font-bold"
      >
        Add
      </button>
    </form>
  );
};

export default AddArticleForm;
