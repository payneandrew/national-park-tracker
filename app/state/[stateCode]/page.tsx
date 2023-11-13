import { USStates } from '@/mocks/states';
import axios from 'axios';
import Head from 'next/head';
import Parks from '../../components/parks';
export const dynamic = 'force-dynamic';

const StatePage = async ({ params }: { params: { stateCode: string } }) => {
  const stateCode = params.stateCode;

  const { data: nationalParks } = await axios.get(
    'https://developer.nps.gov/api/v1/parks',
    {
      headers: {
        Accept: 'application/json',
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
        <title>{`${stateCode} Parks`}</title>
        <meta
          name="description"
          content="Explore national parks and plan your visits."
        />
      </Head>

      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4 text-white">{`${
          USStates[stateCode as keyof typeof USStates]
        } Parks`}</h1>
        {nationalParks && <Parks parks={nationalParks.data} />}
      </div>
    </div>
  );
};

export default StatePage;
