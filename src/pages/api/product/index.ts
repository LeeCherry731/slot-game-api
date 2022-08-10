/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma-client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const coins = await prisma.products.findMany();

    return res.status(200).json({ data: coins });
  }
};
