import axios from "axios";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const stateCode = searchParams.get("stateCode");
    const response = await axios.get("https://developer.nps.gov/api/v1/parks", {
      headers: {
        Accept: "application/json",
      },
      params: {
        api_key: process.env.NP_API_KEY,
        stateCode,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    // return a 500 Internal Server Error response
  }
}
