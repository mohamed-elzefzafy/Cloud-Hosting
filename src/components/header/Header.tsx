import Link from "next/link"
import style from "./header.module.css";
import Navbar from "./Navbar";


const Header = () => {
  return (
    <header className={style.header}>
<Navbar/>
      <div className={style.right}>
      <Link href="/login" className={style.btn}>Login</Link>
      <Link href="/register" className={style.btn}>Register</Link>
      </div>
    </header>

  )
}

export default Header