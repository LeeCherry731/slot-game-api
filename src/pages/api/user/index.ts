/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma-client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    console.log(req.url);
    const users = await prisma.user.findMany({
      take: 30,
      include: {
        _count: {
          select: { orderDetails: true },
        },
      },
    });

    res.status(200).json({ data: users });
  }
};
