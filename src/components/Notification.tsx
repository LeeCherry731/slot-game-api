import { userInfo } from "os";
import React from "react";
import { User } from "../types/project_type";

type Props = {
  setExit: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
};

const Notification = ({ setExit, user }: Props) => {
  return (
    <div
      id="alert-additional-content-3"
      className="p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200 fixed top-2 right-2 z-30 w-96"
      role="alert"
    >
      <div className="flex items-center">
        <svg
          aria-hidden="true"
          className="mr-2 w-5 h-5 text-green-700 dark:text-green-800"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium text-green-700 dark:text-green-800">
          UserID: {user?.id ?? ""}
        </h3>
        <div className="absolute right-3">
          <button
            onClick={() => {
              setExit(false);
            }}
          >
            X
          </button>
        </div>
      </div>
      <div className="mt-2 mb-4 text-sm text-green-700 dark:text-green-800">
        username: {user?.username ?? ""} just comfired!
      </div>
      <div className="flex">
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-green-800 dark:hover:bg-green-900"
        >
          <svg
            aria-hidden="true"
            className="-ml-0.5 mr-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path
              fill-rule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          View more
        </button>
        <button
          type="button"
          className="text-green-700 bg-transparent border border-green-700 hover:bg-green-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-green-800 dark:text-green-800 dark:hover:text-white"
          data-dismiss-target="#alert-additional-content-3"
          aria-label="Close"
          onClick={() => {
            setExit(false);
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default Notification;
