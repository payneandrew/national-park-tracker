'use client';

import ImageGrid from '@/app/components/image-grid';
import MapContainer from '@/app/components/map-container';
import { ParkDetail } from '@/nps-api/parks/types';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface DetailsProps {}

const Details: React.FC<DetailsProps> = () => {
  const [park, setPark] = useState<ParkDetail>();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
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
      setPark(data.data);
    })();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-2 text-rocks-canyons">
        {park.fullName}
      </h1>
      <MapContainer
        markerPosition={{
          lat: Number(park.latitude),
          lng: Number(park.longitude),
        }}
      />
      <Link href={park.directionsUrl} className="underline">
        Get Directions
      </Link>
      <h2 className="text-lg font-semibold text-rocks-canyons">Directions</h2>
      <p className="text-gray-700">{park.directionsInfo}</p>
      <h2 className="text-lg font-semibold text-rocks-canyons">Description</h2>
      <p className="text-gray-700">{park.description}</p>

      <h2 className="text-lg font-semibold text-rocks-canyons">
        Weather Information
      </h2>
      <p className="text-gray-700">{park.weatherInfo}</p>

      {park.activities && park.activities.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-rocks-canyons">
            Activities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {park.activities.map((activity, index) => (
              <div
                key={index}
                className="bg-gray-200 text-gray-700 py-1 px-2 rounded-full text-sm justify-center items-center flex"
              >
                {activity.name}
              </div>
            ))}
          </div>
        </>
      )}

      {park.entranceFees && park.entranceFees.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-rocks-canyons">
            Entrance Fees
          </h2>
          {park.entranceFees.map((fee, index) => (
            <div
              className="mb-4 p-4 bg-gray-100 rounded-lg text-gray-700"
              key={index}
            >
              <h3 className="font-bold ">{fee.title}</h3>
              <p>
                <strong>Cost:</strong> ${fee.cost}
              </p>
              <p>
                <strong>Description:</strong> {fee.description}
              </p>
            </div>
          ))}
        </>
      )}
      {park.images && park.images.length > 0 && (
        <ImageGrid images={park.images} />
      )}
    </>
  );
};

export default Details;
