import { ParkResponse } from "@/types/parks";
import axios from "axios";
import Head from "next/head";
import Parks from "../components/parks";
const states = require("us-state-converter");

const StatePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const state = searchParams.state;
  const stateCode = states.abbr(searchParams.state);

  const getParkByState = async (stateCode: string): Promise<ParkResponse> => {
    const allParks = await axios
      .get(`http://localhost:3000/api/parks`, {
        params: {
          stateCode: stateCode,
        },
      })
      .then((resp) => {
        return resp.data;
      })
      .catch(async (err) => {
        return err;
      });
    return allParks;
  };

  const nationalParks = await getParkByState(stateCode);

  return (
    <div>
      <Head>
        <title>{`${state} Parks`}</title>
        <meta
          name="description"
          content="Explore national parks and plan your visits."
        />
      </Head>

      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4 text-white">{`${state} Parks`}</h1>
        {nationalParks && <Parks parks={nationalParks.data} />}
      </div>
    </div>
  );
};

export default StatePage;
