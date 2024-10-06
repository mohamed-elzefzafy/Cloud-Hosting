"use client"

import request from "@/utils/request"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify";



const LogoutButton = () => {
const router = useRouter();
    const logoutHandler = async () =>{
        try {
          await request.get("/api/v1/users/logout");
          router.replace("/login")
          router.refresh();
        
        } catch (error) {
            toast.warning("some thing went wrong");
        }
    }
  return (
  <button className="bg-gray-700 text-gray-200 px-1 rounded" onClick={logoutHandler}>
    Logout
    </button>
  )
}

export default LogoutButton