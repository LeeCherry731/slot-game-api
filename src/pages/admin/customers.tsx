import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/syncfusionComponents/SearchBar";
import UserTable from "../../components/UserTable";
import AdminLayout from "../../layouts/AdminLayout";

interface Props {}

const customers = (props: Props) => {
  return (
    <AdminLayout>
      <SearchBar />
      <UserTable />
    </AdminLayout>
  );
};

export default customers;
