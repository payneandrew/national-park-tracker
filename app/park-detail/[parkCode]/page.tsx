import { ParkDetail } from "@/nps-api/parks/types";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
const states = require("us-state-converter");
export const dynamic = "force-dynamic";

const ParkDetailPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const parkCode = searchParams?.parkCode;
  console.log(parkCode);

  const { data } = await axios.get("https://developer.nps.gov/api/v1/parks", {
    headers: {
      Accept: "application/json",
    },
    params: {
      api_key: process.env.NP_API_KEY,
      parkCode: "yell",
    },
  });
  const park: ParkDetail = data.data[0];

  console.log(park);

  return (
    <div>
      <Head>
        <title>{`${park.fullName}`}</title>
        <meta
          name={`${park.fullName}`}
          content="Explore national parks and plan your visits."
        />
      </Head>

      <div className="p-4 md:p-8 bg-white shadow-md rounded-lg flex flex-col gap-4">
        <h1 className="text-xl font-semibold mb-2 text-rocks-canyons">
          {park.fullName}
        </h1>
        <p className="text-gray-700">
          <strong>Description:</strong> {park.description}
        </p>
        <p className="text-gray-700">
          <strong>Directions:</strong> {park.directionsInfo}
        </p>

        <p className="text-gray-700">
          <strong>Weather Information:</strong> {park.weatherInfo}
        </p>

        <Link href={park.directionsUrl} className="underline text-blue-500">
          Get Directions
        </Link>

        <h2 className="text-xl font-semibold mb-2 text-rocks-canyons">
          Entrance Fees
        </h2>
        {park.entranceFees.map((fee, index) => (
          <div className="mb-4 p-4 bg-gray-100 rounded-lg" key={index}>
            <h3 className="font-bold text-gray-700">{fee.title}</h3>
            <p>
              <strong>Cost:</strong> ${fee.cost}
            </p>
            <p>
              <strong>Description:</strong> {fee.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkDetailPage;
