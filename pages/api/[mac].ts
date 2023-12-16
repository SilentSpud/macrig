import type { NextApiRequest, NextApiResponse } from "next";
import oui from "oui";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let mac = "";
  try {
    mac = oui(req.url?.toString().replace(/\/api\//g, "")).split("\n")[0] ?? "MAC Not Found";
  }
  catch (e) {
    mac = "MAC Not Found";
  }
  res.status(200).send(mac);
}
