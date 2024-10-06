import Link from 'next/link';
import React from 'react'

interface PaginationProps {
  pages : number,
  pagesNumber: number,
  route : string,
}
const Pagination = ({pages , pagesNumber , route}: PaginationProps) => {
  const pagesArr : number[] = [];
for (let i = 1; i <= pages; i++) {
 pagesArr.push(i);
  
}
  return (
    <div className='flex justify-center items-center mt-2 mb-10'>
          <Link href={`${route}?pageNumber=${pagesNumber !== 1 ? pagesNumber - 1 : pagesNumber}`} className={`border border-gray-700
         ${pagesNumber !== 1 ? "text-gray-700" : "text-gray-500 cursor-default"} px-3 py-1 font-bold text-xl cursor-pointer
          hover:bg-gray-200 transition rounded-tl rounded-bl`}> Prev </Link>

      {pagesArr?.map(page => 
        <Link href={`${route}?pageNumber=${page}`} key={page} className={`border border-gray-700 ${pagesNumber === page ? "text-red-700" : "text-gray-700"} px-3 py-1 font-bold text-xl
         cursor-pointer hover:bg-gray-200 transition`}> 
         {page} 
         </Link>
      )}
          <Link href={`${route}?pageNumber=${pagesNumber < pages ? pagesNumber + 1 : pagesNumber}`} className={`border border-gray-700
        ${pagesNumber < pages ? "text-gray-700" : "text-gray-500 cursor-default"} px-3 py-1 font-bold text-xl cursor-pointer hover:bg-gray-200 
         transition rounded-tr rounded-br`}> Next </Link>
    </div>
  )
}

export default Pagination;