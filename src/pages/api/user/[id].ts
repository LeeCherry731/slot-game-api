/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../libs/prisma-client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.url);
  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.query.id) },
    });

    res.status(200).json({ data: user });
  }

  if (req.method === "POST") {
    const { email, name, coins } = req.body;
    const user = await prisma.user.updateMany({
      where: { id: Number(req.query.id) },
      data: {
        email,
        name,
        coins: Number(coins),
      },
    });

    res.status(200).json({ data: user });
  }

  if (req.method === "DELETE") {
    const user = await prisma.user.delete({
      where: { id: Number(req.query.id) },
    });

    res.status(200).json({ data: user });
  }
};
