import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import apiAuth from "../../../utils/apiAuth";
import * as Yup from "yup";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { User } from "@prisma/client";

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

const userId = (props: Props) => {
  const rounter = useRouter();
  const [userId, setUserId] = useState<string | string[]>("");
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const { id } = rounter.query;
    console.log(id);
    setUserId(id);
    console.log(`userId: ${userId}`);
    if (userId) {
      apiAuth.get(`/api/user/${userId}`).then((res) => {
        // apiAuth.get(`/api/user/1`).then((res) => {
        setUser(res.data.data);
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

  console.log(user);

  return (
    <AdminLayout>
      <div className="grid h-screen place-items-center w-full pl-56 mt-6">
        <div className="block p-6  rounded-lg shadow-lg bg-white w-3/5">
          <h1>Edit</h1>
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
                apiAuth
                  .post(`api/user/${userId}`, {
                    email: values.email,
                    name: values.name,
                    coins: values.coins,
                  })
                  .then(function (response) {
                    alert("Edit Success");
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
                  <h1 className="text-lg uppercase">Login</h1>
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
                      value={formik.values.coins}
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
