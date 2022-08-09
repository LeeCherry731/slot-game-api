import React, { useEffect, useState } from "react";

import HeaderStats from "../components/HeaderStats";
import Navbar from "../components/syncfusionComponents/Navbar";
import Sidebar from "../components/syncfusionComponents/Sidebar";
import Tooltip from "../components/syncfusionComponents/Tooltip";
import { useStateContext } from "../contexts/ContextProvider";

import io from "socket.io-client";
import { Events, User } from "../types/project_type";
import Notification from "../components/Notification";

type Props = {
  children: any;
};

let socket;
const AdminLayout = (props: Props) => {
  const { activeMenu } = useStateContext();
  const [user, setUser] = useState<User | null>();
  const [showNoti, setShowNoti] = useState<boolean>(false);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");

    socket = io();

    socket.on(Events.reciveConfirmed, (user: User) => {
      setUser(user);
      setShowNoti(true);
      startTime();
    });
  };

  const startTime = () => {
    const time = setTimeout(() => {
      setShowNoti(false);
      clearTimeout(time);
    }, 6000);
  };

  const noti = showNoti ? (
    <Notification setExit={setShowNoti} user={user} />
  ) : null;

  return (
    <>
      {noti}
      <Tooltip />
      <div className="flex">
        {/* <AdminNavbar /> */}
        {activeMenu ? <Sidebar /> : <Sidebar />}
        <div className="flex w-full flex-col">
          <Navbar />
          {props.children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
