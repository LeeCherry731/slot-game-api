import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import apiAuth from "../../../utils/apiAuth";
import * as Yup from "yup";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { Products, User } from "@prisma/client";
import CoinProducts from "../../../components/CoinProducts";
import Loading from "../../../components/Loading";
import Cart from "../../../components/syncfusionComponents/Cart";

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

const userId = ({ id }: any) => {
  const [coins, setCoins] = useState<number>();
  const [coinProducts, setCoinProducts] = useState<Products[]>();

  const router = useRouter();
  const [userId, setUserId] = useState<string | string[]>("");
  const [user, setUser] = useState<User>();

  useEffect(() => {
    apiAuth
      .get("/api/product")
      .then((res) => {
        setCoinProducts(res.data.data);
        console.log(coinProducts);
      })
      .catch((e) => {
        console.log("can't fetch Coins data");
      });
  }, []);

  useEffect(() => {
    setUserId(id);

    if (userId) {
      apiAuth
        .get(`/api/user/${userId}`)
        .then((res) => {
          // apiAuth.get(`/api/user/1`).then((res) => {
          setUser(res.data.data);
          setCoins(res.data.data.coins);
        })
        .catch((e) => {
          console.log("can't fetch User data");
        });
    }
  }, [userId]);

  const validate = Yup.object({
    id: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),

    email: Yup.string().email().required("email is required"),
    name: Yup.string().required("role is required"),
    role: Yup.string().required("rolerole is required"),
    coins: Yup.string().required("coins is required"),
    createdAt: Yup.string().required("createdAt is required"),
  });

  let coinProductsList = coinProducts ? (
    <div className="flex flex-wrap gap-2 justify-center">
      {coinProducts.map((e) => (
        <CoinProducts
          key={e.id}
          coins={coins}
          coinProducts={e}
          setCoins={setCoins}
          resetCoins={user ? user.coins : 0}
        />
      ))}
    </div>
  ) : (
    <Loading />
  );

  const cart = <Cart />;

  return (
    <AdminLayout>
      {cart ?? null}
      <div className="grid h-auto place-items-center w-full pt-6 ">
        <div className="block p-6 rounded-lg shadow-lg bg-white w-full">
          {user ? (
            <Formik
              initialValues={{
                id: String(user.id),
                email: String(user.email),
                name: String(user.name),
                role: String(user.role),
                coins: String(user.coins),
                createdAt: String(user.createdAt),
                orders: [],
              }}
              validationSchema={validate}
              onSubmit={async (
                values: Values,
                actions: FormikHelpers<Values>
              ) => {
                console.log("summit");
                apiAuth
                  .post(`api/user/${userId}`, {
                    email: values.email,
                    name: values.name,
                    coins: coins,
                  })
                  .then(function (response) {
                    setCoins(Number(values.coins));

                    alert("Edit Success");
                    router.reload();
                    console.log(response);
                  })
                  .catch(function (error) {
                    alert("Edit Failed");
                    console.log(error);
                  });
                actions.setSubmitting(false);
              }}
            >
              {(formik) => (
                <div>
                  <h1 className="text-lg uppercase">Edit</h1>
                  <Form>
                    <label htmlFor="id">ID</label>
                    <Field
                      className="form-control
          block
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
                      id="id"
                      name="id"
                      placeholder="id"
                      readOnly
                      value={formik.values.id}
                    />

                    <label htmlFor="email">Email</label>
                    <Field
                      className="form-control
          block
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
                      id="email"
                      name="email"
                      placeholder="email"
                      value={formik.values.email}
                    />

                    <label htmlFor="username">Username</label>
                    <Field
                      className="form-control
          block
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
                      id="username"
                      name="username"
                      placeholder="username"
                      type="username"
                      value={formik.values.name}
                    />
                    <label htmlFor="role">role</label>
                    <Field
                      className="form-control
          block
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
                      id="role"
                      name="role"
                      placeholder="role"
                      type="role"
                      value={formik.values.role}
                    />
                    {coinProductsList}
                    <label htmlFor="coins">coins</label>
                    <Field
                      className="form-control
          block
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
                      id="coins"
                      name="coins"
                      placeholder="coins"
                      type="coins"
                      value={coins ?? ""}
                    />

                    <label htmlFor="createdAt">createdAt</label>
                    <Field
                      className="form-control
          block
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
                      id="createdAt"
                      name="createdAt"
                      placeholder="createdAt"
                      type="createdAt"
                      readOnly
                      value={formik.values.createdAt}
                    />

                    <br />
                    <button
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
                      type="submit"
                    >
                      SAVE
                    </button>
                  </Form>
                </div>
              )}
            </Formik>
          ) : (
            <h1>Loading</h1>
          )}
          <br />
          <label htmlFor="email">Orders</label>
          <br />
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          First
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Last
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Handle
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-100 border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          1
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          Mark
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          Otto
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          @mdo
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          2
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          Jacob
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          Thornton
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          @fat
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default userId;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  console.log(context.query.id);
  return { props: { id } };
};
