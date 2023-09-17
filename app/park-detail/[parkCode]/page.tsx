import ParkDetails from '@/app/components/park-details';
import { ParkDetail } from '@/nps-api/parks/types';
import axios from 'axios';
import Head from 'next/head';
export const dynamic = 'force-dynamic';

export default async function ParkDetailPage({
  params,
}: {
  params: { parkCode: string };
}) {
  const parkCode = params.parkCode;

  const { data } = await axios.get('https://developer.nps.gov/api/v1/parks', {
    headers: {
      Accept: 'application/json',
    },
    params: {
      api_key: process.env.NP_API_KEY,
      parkCode: parkCode,
    },
  });
  const park: ParkDetail = data.data[0];
  //console.log('park from page.ts', park);

  return (
    <div>
      <Head>
        <title>{`${park.fullName}`}</title>
        <meta
          name={`${park.fullName}`}
          content="Explore national parks and plan your visits."
        />
        <ParkDetails park={park} />
      </Head>
    </div>
  );
}
