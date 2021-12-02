import type { NextApiRequest, NextApiResponse } from "next";
import oui from "oui";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).send(oui(req.url?.toString().replace(/\/api\//g, "")).split("\n")[0] ?? "MAC Not Found");
}
