"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";


const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);
  console.log(password);
const formSubmitHandler = (e : FormEvent) => {
e.preventDefault();
if (userName ==="") return toast.error("user Name is required");
if (email ==="") return toast.error("email is required");
if (password ==="") return toast.error("password is required");

  
console.log({email , password , userName});

}
  return (
    <form className="flex flex-col gap-4" onSubmit={formSubmitHandler}>
    <input
      className="mb-4 border rounded p-2 text-xl"
      type="text"
      placeholder="Enter Your User Name"
      value={userName}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setUserName(e.target.value)
      }
    />
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
      className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold">
      Register
    </button>
  </form>
  )
}

export default RegisterForm