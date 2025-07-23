import type { NextApiRequest, NextApiResponse } from "next";
import oui from "oui-data" with { type: "json" };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const inMac = req.url?.toString().replace(/\/api\//g, "");
    if (!inMac) {
      res.status(404).send("MAC Not Provided");
      return;
    }
    // Validate MAC address format (accepts 6 to 12 hex digits, with or without delimiters)
    const macRegex = /^([0-9A-Fa-f]{2}([:\-\.]?)){2,5}[0-9A-Fa-f]{2}$/;
    if (!macRegex.test(inMac)) {
      res.status(404).send("Invalid MAC Format");
      return;
    }

    // Remove all non-hex characters (delimiters)
    const cleanedMac = inMac.replace(/[^a-fA-F0-9]/g, "").toUpperCase();

    // Ensure we have at least 6 hex digits for OUI
    if (cleanedMac.length < 6) {
      res.status(404).send("MAC Too Short");
      return;
    }

    // Get the OUI (first 6 hex digits)
    const ouiKey = cleanedMac.slice(0, 6);

    // Look up the OUI in the oui object
    const mac = (oui as Record<string, string>)[ouiKey];
    if (mac) {
      res.status(200).send(mac.split("\n")[0]);
    } else {
      res.status(404).send("MAC Not Found");
    }
  }
  catch (e) {
    res.status(404).send("Error encountered: " + (e instanceof Error ? e.message : String(e)));
  }
}
