// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import oui from "oui";

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const mac = req.url?.toString().replace(/\/api\//g, "") ?? "";

  const macInfo = oui(mac);
  res.status(200).send(macInfo.split("\n")[0] ?? "MAC Not Found");
}
