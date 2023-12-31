// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { apiHandler } from "@/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" || req.method === "PUT") {
    try {
      const data = await apiHandler({
        method: req.method,
        url: req.body.id ? `/items/${req.body.id}` : "/items",
        data: {
          title: req.body.title,
          createdAt: new Date().toISOString(),
        },
      });
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  } else if (req.method === "GET") {
    try {
      const data = await apiHandler({
        method: req.method,
        url: "/items",
      });
      res.status(200).send(data.data);
    } catch (error) {
      res.status(500).send(error);
    }
  } else if (req.method === "DELETE") {
    try {
      const data = await apiHandler({
        method: req.method,
        url: `/items/${req.body.id}`,
      });
      res.status(200).send({
        success: true,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
