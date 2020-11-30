import { NextApiRequest, NextApiResponse } from "next";
import { UserConnector } from "~/models/user";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await UserConnector.create(req.body);
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
