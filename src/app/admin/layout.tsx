import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import { Metadata } from "next";


interface IPropsAdminDashboard {
  children : ReactNode;
}

export const metadata : Metadata = {
  title : "Admin Dashboard",
  description : "this is admin dashboard",
}
const AdminDashboardLayout = ({children} : IPropsAdminDashboard) => {
  return (
    <div className="overflow-height flex items-start justify-between overflow-hidden">
    <div className="overflow-height w-15 lg:w-1/5 bg-purple-600 text-white p-1 lg:p-5">
        <AdminSidebar/>
    </div>

    <div className="overflow-height w-full lg:w-4/5 overflow-y-scroll">
      {children}
    </div>
    </div>
  )
}

export default AdminDashboardLayout;