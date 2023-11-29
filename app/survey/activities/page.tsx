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
        api_key: process.env.NP_API_KEY,
      },
    }
  );

  const activities: Activities[] = data.data;

  return (
    <>
      <h1 className="text-3xl font-semibold mb-4 text-white">
        Select the activities that are important to you
      </h1>
      <main className="flex min-h-screen flex-col justify-between p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activities.map((activity) => (
            <button
              key={activity.id}
              className="rounded overflow-hidden shadow-lg p-4 bg-wood-trees transform transition-transform duration-200 hover:scale-105"
            >
              <p className="font-bold text-xl mb-2 text-white text-bold">
                {activity.name}
              </p>
            </button>
          ))}
        </div>
        <Link
          href={{ pathname: '/survey/amenities' }}
          className="bg-white marker:-rounded p-2 m-2 cursor-pointer transform transition-transform duration-200 hover:scale-105 text-black shadow-lg"
        >
          Next
        </Link>
      </main>
    </>
  );
}
