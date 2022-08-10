/* eslint-disable import/no-anonymous-default-export */
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

import { Role } from "../../../../prisma/seed";
import prisma from "../../../libs/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.TOKEN_SECRET;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  // Check in the database
  // if a user with this username
  // and password exists

  const user = await prisma.user.findUnique({ where: { name: username } });

  if (!user) return res.status(401).json({ message: "Invalid credentials!" });

  if (
    username === (await user).name &&
    password === (await user).password &&
    (await user).role === Role.ADMIN
  ) {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10, // 10 days
        username: username,
      },
      secret
    );

    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);
    res.status(200).json({ message: "Success!" });
  } else {
    res.status(401).json({ message: "Invalid credentials!" });
  }
}
