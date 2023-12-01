import ActivitiesGrid from '@/app/components/activities-grid';
import { Activities } from '@/nps-api/parks/types';
import axios from 'axios';
import Link from 'next/link';

export default async function ActivitiesPage() {
  const { data } = await axios.get(
    'https://developer.nps.gov/api/v1/activities',
    {
      headers: {
        Accept: 'application/json',
      },
      params: {
        api_key: process.env.NEXT_PUBLIC_NP_API_KEY,
      },
    }
  );

  const activities: Activities[] = data.data;

  return (
    <>
      <h1 className="text-3xl font-semibold text-white">
        Select the activities that are important to you
      </h1>
      <div className="flex min-h-screen flex-col justify-between gap-4">
        <div className="flex justify-end">
          <Link
            href={{ pathname: '/' }}
            className="bg-white rounded p-2 m-2  transform transition-transform duration-200 hover:scale-105 text-black shadow-lg"
          >
            Skip
          </Link>
          <Link
            href={{ pathname: '/survey/amenities' }}
            className="bg-white rounded p-2 m-2 transform transition-transform duration-200 hover:scale-105 text-black shadow-lg"
          >
            Next
          </Link>
        </div>
        <ActivitiesGrid activities={activities} />
      </div>
    </>
  );
}
