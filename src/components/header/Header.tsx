import Link from "next/link"
import style from "./header.module.css";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { verifyTokenForClient } from "@/utils/verifyToken";
import LogoutButton from "./LogoutButton";


const Header = () => {
  const token = cookies().get("jwt")?.value || "";
  const user = verifyTokenForClient(token);

  return (
    <header className={style.header}>
<Navbar isAdmin={user?.isAdmin || false} />
      <div className={style.right}>
        {user ? 
        (<>
        <strong className="text-blue-800 md:text-xl capitalize">{user?.userName}</strong>
        <LogoutButton/>
        </>)
         :
          (<>
                <Link href="/login" className={style.btn}>Login</Link>
                <Link href="/register" className={style.btn}>Register</Link>
          </>)
          }
      </div>
    </header>

  )
}

export default Header