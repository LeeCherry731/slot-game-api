import React, { useEffect, useState } from "react";
import UserTable from "../../components/UserTable";

import { User, PrismaClient } from "@prisma/client";
import AdminLayout from "../../layouts/AdminLayout";

const prisma = new PrismaClient();

type Props = { users: User[] };

const users = (props: Props) => {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    setUsers(users);
  }, []);

  return (
    <AdminLayout>
      <div className="ml-64 mt-4">
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            {<UserTable users={props.users} /> ?? "Loading"}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default users;

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context) => {
  const users = await prisma.user.findMany({ take: 30 });
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
};
