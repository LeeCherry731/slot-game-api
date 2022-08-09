/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma-client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    console.log(req.url);
    const coins = await prisma.products.findMany();
    console.log(coins);
    return res.status(200).json({ data: coins });
  }
};
