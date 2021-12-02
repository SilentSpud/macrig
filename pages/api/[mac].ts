import type { NextApiRequest, NextApiResponse } from "next";
import oui from "oui";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const mac = oui(req.url?.toString().replace(/\/api\//g, "")) ?? "";
  res.status(200).send(mac.split("\n")[0] ?? "MAC Not Found");
}
