import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import React, { ChangeEvent, useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import apiAxios from "../../../utils/apiAxios";

import prisma from "../../../libs/prisma-client";
import CoinProducts from "../../../components/CoinProducts";

type Props = {};

interface Values {
  id: string;
  email: string;
  name: string;
  role: string;
  coins: string;
  createdAt: string;
  orders: string[];
}

const userId = ({ id, products, user }: any) => {
  const [coins, setCoins] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    setCoins(user.coins);
    setName(user.name);
    setEmail(user.email);
  }, []);

  const SubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    apiAxios.put(`api/user`, {
      id,
      email: user.email,
      name: user.name,
      coins: Number(500),
    });
  };

  const coinHandleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value);
    if (!isNaN(Number(num))) {
      setCoins(num);
    }
  };
  const emailHandleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const nameHandleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <AdminLayout>
      {products.map((item) => {
        <CoinProducts
          key={item.id}
          coins={Number(coins)}
          coinProducts={item.amount}
          resetCoins={item.coins}
          setCoins={setCoins}
        />;
      })}
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-full m-4">
        <form onSubmit={SubmitHandler}>
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder="ID"
              value={user.id}
              readOnly
            />
          </div>

          <div className="form-group mb-6">
            <input
              type="email"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput8"
              placeholder="Email"
              value={email}
              onChange={emailHandleInputChange}
            />
          </div>

          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput8"
              placeholder="name"
              value={name}
              onChange={nameHandleInputChange}
            />
          </div>

          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput8"
              placeholder="role"
              value={user.role}
              readOnly
            />
          </div>

          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput8"
              placeholder="coins"
              name="coins"
              value={coins}
              onChange={coinHandleInputChange}
            />
          </div>

          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput8"
              placeholder="createdAt"
              value={user.createdAt}
              readOnly
            />
          </div>

          <button
            type="submit"
            className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          >
            SAVE
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default userId;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;

  const user = await prisma.user.findUnique({
    where: { id: String(id) },
  });

  const products = await prisma.products.findMany();

  return {
    props: {
      id,
      user: JSON.parse(JSON.stringify(user)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
