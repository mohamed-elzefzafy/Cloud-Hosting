"use client";
import ButtonSpinner from "@/components/ButtonSpinner";
import request from "@/utils/request";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  
const formSubmitHandler = async(e : FormEvent) => {
e.preventDefault();
if (email ==="") return toast.error("email is required");
if (password ==="") return toast.error("password is required");

try {
  setLoading(true);
  await request.post("/api/v1/users/login" ,{password , email});
  router.replace("/");
  setLoading(false);
 router.refresh();
} catch (error : any ) {
  toast.error(error?.response.data.message);
  setLoading(false);
}
}
  return (
    <form className="flex flex-col gap-4" onSubmit={formSubmitHandler}>
      <input
        className="mb-4 border rounded p-2 text-xl"
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <input
        className="mb-4 border rounded p-2 text-xl"
        type="password"
        placeholder="Enter Your password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <button
        type="submit"
        disabled={loading}
        className="text-2xl text-white bg-blue-800 disabled:bg-blue-500 
        disabled:cursor-not-allowed p-2 rounded-lg font-bold"
      >
        {loading ? <ButtonSpinner/> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
