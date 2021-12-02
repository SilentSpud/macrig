// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import oui from "oui";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const mac = oui(req.url?.toString().replace(/\/api\//g, "")) ?? "";
  res.status(200).send(mac.split("\n")[0] ?? "MAC Not Found");
}
