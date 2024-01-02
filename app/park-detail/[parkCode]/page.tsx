import { ParkDetail } from '@/nps-api/parks/types';
import axios from 'axios';
export const dynamic = 'force-dynamic';

export default async function ParkDetailPage({
  params,
}: {
  params: { parkCode: string };
}) {
  const parkCode = params.parkCode;

  const { data: parkInfo } = await axios.get(
    'https://developer.nps.gov/api/v1/parks',
    {
      headers: {
        Accept: 'application/json',
      },
      params: {
        api_key: process.env.NEXT_PUBLIC_NP_API_KEY,
        parkCode: parkCode,
      },
    }
  );

  const { data: campgrounds } = await axios.get(
    'https://developer.nps.gov/api/v1/campgrounds',
    {
      headers: {
        Accept: 'application/json',
      },
      params: {
        api_key: process.env.NEXT_PUBLIC_NP_API_KEY,
        parkCode: parkCode,
      },
    }
  );
  const park: ParkDetail = parkInfo.data[0];

  return <></>;
}
