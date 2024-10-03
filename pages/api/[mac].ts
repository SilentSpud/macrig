import type { NextApiRequest, NextApiResponse } from "next";
import oui from "oui";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const mac = oui(req.url?.toString().replace(/\/api\//g, "")).split("\n")[0];
    if (mac) {
      res.status(200).send(mac);
    } else {
      res.status(404).send("MAC Not Found");
    }
  }
  catch (e) {
    res.status(404).send("MAC Not Found");
  }
}
