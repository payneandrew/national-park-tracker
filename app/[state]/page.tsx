import axios from "axios";
import Head from "next/head";
import Parks from "../components/parks";
const states = require("us-state-converter");
export const dynamic = "force-dynamic";

const StatePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const state = searchParams?.state;
  const stateCode = state ? states.abbr(searchParams.state) : "VA";

  if (!state || !stateCode) {
    return <div>Loading...</div>;
  }

  const { data: nationalParks } = await axios.get(
    "https://developer.nps.gov/api/v1/parks",
    {
      headers: {
        Accept: "application/json",
      },
      params: {
        api_key: process.env.NP_API_KEY,
        stateCode: stateCode,
      },
    }
  );

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
