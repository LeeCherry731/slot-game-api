import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import CardBarChart from "../../components/CardBarChart";
import CardLineChart from "../../components/CardLineChart";
import CardPageVisits from "../../components/CardPageVisits";
import CardSocialTraffic from "../../components/CardSocialTraffic";
import Notification from "../../components/Notification";

import { Events, User } from "../../types/project_type";
import AdminLayout from "../../layouts/AdminLayout";

type Props = {};

let socket;

const dashboard = (props: Props) => {
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
  ) : (
    <div className="z-50 text-black">Nothing</div>
  );

  return (
    <AdminLayout>
      {noti}
      <div className="ml-64 top-0">
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            {<CardLineChart /> ?? "Loading"}
          </div>
          <div className="w-full xl:w-4/12 px-4">
            {<CardBarChart /> ?? "Loading"}
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            {<CardPageVisits /> ?? "Loading"}
          </div>
          <div className="w-full xl:w-4/12 px-4">
            {<CardSocialTraffic /> ?? "Loading"}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default dashboard;
