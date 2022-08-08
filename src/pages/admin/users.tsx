import React, { useContext, useEffect, useState } from "react";
import UserTable from "../../components/UserTable";
import AdminLayout from "../../layouts/AdminLayout";

interface Props {}

const users = (props: Props) => {
  return (
    <AdminLayout>
      <div className="ml-64 bg-slate-300 h-auto">
        <div className="flex flex-wrap">
          <div className="w-full ">
            <UserTable />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default users;
