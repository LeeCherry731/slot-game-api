import Router from "next/router";
import React from "react";
import apiAuth from "../utils/apiAuth";

type Props = {};

const AdminNavbar = (props: Props) => {
  return (
    <>
      {/* Navbar */}
      <nav className=" pl-60 absolute top-0 left-0 w-full z-10 bg-slate-600 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 shadow-lg">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-xl uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
          {/* User */}
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={async () => {
              const result = await apiAuth.post("api/auth/logout");
              if (result.status === 200) await Router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
};

export default AdminNavbar;
