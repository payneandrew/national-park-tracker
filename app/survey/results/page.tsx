import SurveyResults from '@/app/components/survey-results';
import { ParkData } from '@/nps-api/parks/types';
import axios from 'axios';
import Link from 'next/link';

export default async function ResultsPage() {
  const { data: allParks } = await axios.get(
    'https://developer.nps.gov/api/v1/parks',
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

  const parks: ParkData = allParks.data;

  return (
    <>
      <h1 className="text-3xl font-semibold text-copper-brown">
        Recommended Parks
      </h1>
      <div className="flex min-h-screen flex-col">
        <div className="flex justify-end py-4">
          <Link
            href={{ pathname: '/survey/activities' }}
            className="bg-white rounded p-2 m-2  transform transition-transform duration-200 hover:scale-105 text-black shadow-lg"
          >
            Back
          </Link>
        </div>
        <SurveyResults parks={parks} />
      </div>
    </>
  );
}
