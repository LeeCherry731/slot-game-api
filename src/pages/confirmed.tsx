import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Events, User } from "../types/project_type";

type Props = {};

export let socket;

const confirmed = (props: Props) => {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const { id, username } = router.query;

  useEffect(() => {
    if (id && username) {
      setUser({ id: id.toString(), username: username.toString() });
      socketInitializer();
    }
  }, [id, username]);
  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");
    socket = io();
    // socket.on(Events.reciveConfirmed, (msg) => {
    //   setMessages((currentMsg) => [
    //     ...currentMsg,
    //     { author: msg.author, message: msg.message },
    //   ]);
    //   console.log(messages);
    // });
  };

  if (!id || !username) return <></>;

  return (
    <div className="w-screen h-screen bg-indigo-100 flex flex-col align-middle justify-center content-center text-center self-center items-center">
      <div className="border-solid border-indigo-400 bg-violet-500 w-96 h-72 pt-10 rounded-md shadow-indigo-900 shadow-2xl">
        <h1 className="text-xl text-white">UserID: {id}</h1>
        <br />
        <h1 className="text-xl text-white">Username: {username}</h1>
        <br />
        <button
          className="hover:bg-purple-400 bg-rose-600 text-xl text-gray-100 rounded-full w-56 h-10 justify-center self-center"
          onClick={(e) => {
            // socket.emit(Events.confirmed, user);
            socket.emit(Events.confirmed, user);
          }}
        >
          {id ? "Confirmed" : "Loading"}
        </button>
      </div>
    </div>
  );
};

export default confirmed;
