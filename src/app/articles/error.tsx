"use client"
import Link from 'next/link'
import React from 'react'
interface IErrorPageProps {
  error : Error,
  reset : () => void,
}
const aeticlesError = ({error ,reset} : IErrorPageProps) => {
  return (
    <div className='text-center pt-7'>
      <p className='text-2xl text-red-900 mb-2'>Custom error for articles</p>
<div className='text-3xl text-red-700 mb-3 font-semibold'>some thing went wrong</div>
<h2 className='text-gray-700 text-xl my-2'>Error Message : {error.message}</h2>
<button onClick={reset} className='block mx-auto bg-red-700 hover:bg-red-800 text-white py-1 px-3 rounded-lg mb-3'>Try Again</button>
<Link  href={"/"} className='text-xl text-blue-700 underline'>back to home page</Link>
    </div>
  )
}

export default aeticlesError;