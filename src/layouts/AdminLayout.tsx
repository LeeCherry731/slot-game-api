import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import FooterAdmin from "../components/FooterAdmin";
import HeaderStats from "../components/HeaderStats";
import Sidebar from "../components/Sidebar";

type Props = {
  children: any;
};

const AdminLayout = (props: Props) => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-slate-500">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {props.children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
