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
      <main className="flex min-h-screen flex-col justify-between p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenities.map((amenity) => (
            <button
              key={amenity.id}
              className="rounded overflow-hidden shadow-lg p-4 bg-wood-trees transform transition-transform duration-200 hover:scale-105"
            >
              <p className="font-bold text-xl mb-2 text-white text-bold">
                {amenity.name}
              </p>
            </button>
          ))}
        </div>
      </main>
    </>
  );
}
