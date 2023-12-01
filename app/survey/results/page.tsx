import SurveyResults from '@/app/components/survey-results';
import { ParkData } from '@/nps-api/parks/types';
import axios from 'axios';

export default async function ResultsPage() {
  const { data } = await axios.get('https://developer.nps.gov/api/v1/parks', {
    headers: {
      Accept: 'application/json',
    },
    params: {
      api_key: process.env.NEXT_PUBLIC_NP_API_KEY,
      limit: 500,
    },
  });

  const parks: ParkData = data.data;

  return (
    <>
      <h1 className="text-3xl font-semibold mb-4 text-white">
        These are parks you would enjoy visiting!
      </h1>
      <div className="flex min-h-screen flex-col justify-between">
        <SurveyResults parks={parks} />
      </div>
    </>
  );
}
