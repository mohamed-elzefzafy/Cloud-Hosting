import { cookies } from 'next/headers';
import AddArticleForm from './AddArticleForm';
import { verifyTokenForClient } from '@/utils/verifyToken';
import { redirect } from 'next/navigation';


const AdminPage = () => {
  const token = cookies().get("jwt")?.value || "";
  if (!token) redirect("/");
  const user = verifyTokenForClient(token);
  if (user?.isAdmin === false) redirect("/");
  return (
    <div className='fixed-height flex items-center justify-center px-5 lg:px-20'>
      <div className="shadow bg-purple-200 rounded w-full p-3">
        <h2 className='text-xl lg:text-2xl text-gray-700 font-semibold mb-4'>Add New Article</h2>
        <AddArticleForm/>
      </div>
    </div>
  )
}

export default AdminPage;