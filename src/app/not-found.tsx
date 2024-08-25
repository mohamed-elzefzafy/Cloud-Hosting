import Link from 'next/link';

const NotFoundPage = () => {
  return (
  <section className='flex items-center justify-center flex-col fixed-height fixed-height'>
<h1 className='text-7xl text-gray-800 font-bold'>404</h1>
<p className='text-gray-500 text-3xl mt-2 mb-5'>Page Not Found</p>
<Link href="/" className='text-xl underline text-red-800'>Go to home page</Link>
  </section>
  )
}

export default NotFoundPage;