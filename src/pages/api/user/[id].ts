/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../libs/prisma-client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: { id: String(req.query.id) },
    });
    // console.log(user)
    res.status(200).json({ data: user });
  }

  if (req.method === "DELETE") {
    const user = await prisma.user.delete({
      where: { id: String(req.query.id) },
    });

    res.status(200).json({ data: user });
  }
};
