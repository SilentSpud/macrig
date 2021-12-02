// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import oui from "oui";

type Data = {
  name: string
}

const MacRegex = /^([0-9a-fA-F]{2}:){5}([0-9a-fA-F]{2})$/;
const SlimMacRegex = /^[0-9a-fA-F]{12}$/;
const ThreeRegex = /^([0-9a-fA-F]{3}:){5}([0-9a-fA-F]{2})$/;
const ThreeDotRegex = /^([0-9a-fA-F]{3}\.){5}([0-9a-fA-F]{2})$/;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const rawMac = req.url?.toString().replace(/\/api\//g, "") ?? "";
  let mac: string = "";
  if (MacRegex.test(rawMac)) {
    mac = rawMac;
  }
  if (SlimMacRegex.test(rawMac)) {
    mac = rawMac.replace(/(..)(..)(..)(..)(..)(..)/g, (_substr, ...args) => {
      const newArgs = [...args];
      newArgs.pop();
      newArgs.pop();
      return newArgs.join(":");
    })
  }

  const macInfo = oui(mac);
  res.status(200).send(macInfo ?? "MAC Not Found");
}
