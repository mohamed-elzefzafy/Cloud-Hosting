"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import style from "./header.module.css";
import { GrTechnology } from 'react-icons/gr';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
const Navbar = () => {
const [toggle, setToggle] = useState(false);
  
  return (
    <nav className={style.navbar}>
    <div>
      <Link href="/" className={style.logo}>Cloud <GrTechnology/> Hosting</Link>
      <div className={style.menu} onClick={() => setToggle(prev => !prev)}> {toggle ? <IoMdClose/> :  <AiOutlineMenu/>} </div>
    </div>
<div className={style.navLinksWrapper} style={{clipPath : toggle ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" : ""}}>
<ul className={style.navLinks}>
      <Link href="/" className={style.navLink} onClick={()=> setToggle(false)}>Home</Link>
      <Link href="/articles" className={style.navLink} onClick={()=> setToggle(false)}>Articles</Link>
      <Link href="/about" className={style.navLink} onClick={()=> setToggle(false)}>About</Link>
      <Link href="/admin" className={style.navLink} onClick={()=> setToggle(false)}>Admin Dashboard</Link>
  
    </ul>
</div>
  </nav>
  )
}

export default Navbar