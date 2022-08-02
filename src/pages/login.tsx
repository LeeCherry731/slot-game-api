import axios from "axios";
import Router from "next/router";
import React, { useState } from "react";
import { Formik, Form, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import apiAuth from "../libs/apiAuth";

interface FormValues {
  username: string;
  password: string;
}

export default function Login(props: FormikProps<FormValues>) {
  const validate = Yup.object({
    username: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),

    password: Yup.string()
      .min(1, "Password must be at least 1 charaters")
      .required("Password is required"),
  });

  return (
    <div className="grid place-items-center h-screen text-white">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-lg w-4/6  bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={validate}
          onSubmit={async (
            values: FormValues,
            actions: FormikHelpers<FormValues>
          ) => {
            actions.validateField("username");
            actions.validateField("password");
            const req = await apiAuth.post("api/auth/login", {
              username: values.username,
              password: values.password,
            });
            if ((await req.status) === 401) {
              alert("Wrong Username or Password");
            }
            if ((await req.status) === 200) {
              Router.push("/admin/dashboard");
            }
            actions.setSubmitting(false);
          }}
        >
          {(formik) => (
            <div>
              <h1 className="text-lg uppercase">Login</h1>
              <Form>
                <label
                  className="form-label inline-block mb-2 text-white"
                  htmlFor="username"
                >
                  Username:
                </label>
                <br />
                <Field
                  className={`block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            ${
                              formik.errors.username
                                ? "border-red-400 "
                                : "border-gray-300 "
                            }bg-white bg-clip-padding
                            border border-solid 
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                  id="username"
                  type="text"
                  placeholder="username"
                  value={formik.values.username}
                />
                {formik.touched?.username && formik.errors?.username && (
                  <div className="text-red-600">{formik.errors?.username}</div>
                )}
                <br />
                <label
                  className="form-label inline-block mb-2 text-white"
                  htmlFor="password"
                >
                  Password:
                </label>
                <br />
                <Field
                  className={`w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            ${
                              formik.errors.password
                                ? "border-red-400 "
                                : "border-gray-300 "
                            }
                            bg-white bg-clip-padding
                            border border-solid
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                  id="password"
                  type="password"
                  placeholder="password"
                  value={formik.values.password}
                />
                {formik.touched?.password && formik.errors?.password && (
                  <div className="text-red-600">{formik.errors?.password}</div>
                )}
                <br />
                <br />
                <button
                  className="px-6
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
                  Submit
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
