import React from 'react'

const pages = [1 , 2 , 3 , 4 , 5 ];
const Pagination = () => {
  return (
    <div className='flex justify-center items-center mt-2 mb-10'>
          <div  className='border border-gray-700
         text-gray-700 px-3 py-1 font-bold text-xl cursor-pointer hover:bg-gray-200 transition rounded-tl rounded-bl'> Prev </div>
      {pages.map(page => 
        <div key={page} className='border border-gray-700
         text-gray-700 px-3 py-1 font-bold text-xl cursor-pointer hover:bg-gray-200 transition'> {page} </div>
      )}
          <div  className='border border-gray-700
         text-gray-700 px-3 py-1 font-bold text-xl cursor-pointer hover:bg-gray-200 transition rounded-tr rounded-br'> Next </div>
    </div>
  )
}

export default Pagination;