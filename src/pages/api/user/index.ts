/* eslint-disable import/no-anonymous-default-export */
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma-client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const param = req.query.param;

  if (req.method === "GET" && param) {
    const name = String(param).trim();
    const id = String(param).trim();

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            id: { startsWith: id },
          },
          { name: { startsWith: name } },
        ],
      },
    });
    return res.status(200).json({ data: users });
  }

  if (req.method === "GET") {
    const users = await prisma.user.findMany({
      take: 30,
      include: {
        _count: {
          select: { orderDetails: true },
        },
      },
    });

    return res.status(200).json({ data: users });
  }
};
