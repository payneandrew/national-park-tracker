import AmenitiesGrid from '@/app/components/amenities-grid';
import { Amenities } from '@/nps-api/parks/types';
import axios from 'axios';

export default async function AmenitiesPage() {
  const { data } = await axios.get(
    'https://developer.nps.gov/api/v1/amenities',
    {
      headers: {
        Accept: 'application/json',
      },
      params: {
        api_key: process.env.NP_API_KEY,
      },
    }
  );

  const amenities: Amenities[] = data.data;

  return (
    <>
      <h1 className="text-3xl font-semibold mb-4 text-white">
        Select the amenities that are important to you
      </h1>
      <div className="flex min-h-screen flex-col justify-between">
        <AmenitiesGrid amenities={amenities} />
      </div>
    </>
  );
}
