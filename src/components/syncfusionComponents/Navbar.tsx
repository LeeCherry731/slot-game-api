import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

import { useStateContext } from "../../contexts/ContextProvider";

import Router from "next/router";
import apiAxios from "../../utils/apiAxios";

type Props = {};

function Navbar({}: Props) {
  const { setActiveMenu } = useStateContext();

  return (
    <div className=" bg-slate-200 h-16 w-full flex items-center justify-between">
      <button
        className="pl-4 hover:scale-150"
        onClick={() => {
          setActiveMenu((v) => !v);
        }}
      >
        <AiOutlineMenu className="text-base" />
      </button>
      <button
        type="button"
        className="w-24 h-12 bg-red-800  text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={async () => {
          const result = await apiAxios.post("api/auth/logout");
          if (result.status === 200) await Router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
