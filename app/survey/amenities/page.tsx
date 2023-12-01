import AmenitiesGrid from '@/app/components/amenities-grid';
import { Amenities } from '@/nps-api/parks/types';
import axios from 'axios';
import Link from 'next/link';

export default async function AmenitiesPage() {
  const { data } = await axios.get(
    'https://developer.nps.gov/api/v1/amenities',
    {
      headers: {
        Accept: 'application/json',
      },
      params: {
        api_key: process.env.NEXT_PUBLIC_NP_API_KEY,
        limit: 500,
      },
    }
  );

  const amenities: Amenities[] = data.data;

  return (
    <>
      <h1 className="text-3xl font-semibold text-white">
        Select the amenities that are important to you
      </h1>
      <div className="flex min-h-screen flex-col justify-between gap-4">
        <div className="flex justify-between">
          <Link
            href={{ pathname: '/survey/activities' }}
            className="bg-white rounded p-2 m-2  transform transition-transform duration-200 hover:scale-105 text-black shadow-lg"
          >
            Back
          </Link>
          <Link
            href={{ pathname: '/survey/results' }}
            className="bg-white rounded p-2 m-2 transform transition-transform duration-200 hover:scale-105 text-black shadow-lg"
          >
            Next
          </Link>
        </div>
        <AmenitiesGrid amenities={amenities} />
      </div>
    </>
  );
}
