import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get("https://developer.nps.gov/api/v1/parks", {
      headers: {
        Accept: "application/json",
      },
      params: {
        api_key: process.env.NP_API_KEY,
      },
    });

    if (response.status === 200) {
      const nationalParksData = response.data;

      // Respond with the data as JSON
      res.status(200).json(nationalParksData);
    } else {
      // If the request was not successful, respond with an error
      res.status(response.status).json({ error: "Failed to fetch data" });
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("An error occurred while fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
