'use client';

import useVisitedParks from '@/app/hooks/use-visited-parks';
import { USStates } from '@/mocks/states';
import { ParkDetail } from '@/nps-api/parks/types';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import AddRemoveButton from '../add-remove-button';
import ImageGrid from '../image-grid';

interface DetailsProps {
  park: ParkDetail;
}

const Details: React.FC<DetailsProps> = ({ park }) => {
  const { isParkVisited, toggleVisited } = useVisitedParks();

  const stateCodes = park.states.split(',');
  const stateNames = useMemo(
    () =>
      stateCodes.map((code) => USStates[code.trim() as keyof typeof USStates]),
    [stateCodes]
  );
  const formattedStateNames = stateNames.join(', ');

  const GoogleMap = dynamic(() => import('../map-container'), { ssr: false });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-start gap-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-copper-brown">
            {park.fullName}
          </h1>
          <h3 className="text-xl text-black-leather-jacket">
            {formattedStateNames}
          </h3>
        </div>
        {process.env.NEXT_PUBLIC_VISITED_PARKS_ENABLED === 'true' && (
          <AddRemoveButton
            park={park}
            isParkVisited={isParkVisited}
            toggleVisited={toggleVisited}
          />
        )}
      </div>
      {park.images && park.images.length > 0 && (
        <ImageGrid images={park.images} />
      )}
      <h2 className="text-xl font-semibold text-copper-brown">Description</h2>
      <p className="text-gray-700">{park.description}</p>
      <h2 className="text-xl font-semibold text-copper-brown">
        Weather Information
      </h2>
      <p className="text-gray-700">{park.weatherInfo}</p>
      {park.activities && park.activities.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-copper-brown">
            Activities
          </h2>
          <div className="flex flex-wrap gap-2">
            {park.activities.map((activity, id) => (
              <div
                key={id}
                className="bg-black-leather-jacket text-white py-2 px-4 rounded-full text-sm"
              >
                {activity.name}
              </div>
            ))}
          </div>
        </>
      )}
      {park.entranceFees && park.entranceFees.length > 0 && (
        <details>
          <summary className="text-xl font-semibold text-copper-brown cursor-pointer">
            Entrance Fees
          </summary>
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
        </details>
      )}
      <h2 className="text-xl font-semibold text-copper-brown">Directions</h2>
      <p className="text-gray-700">{park.directionsInfo}</p>
      <GoogleMap
        markerPositions={[
          {
            lat: Number(park.latitude),
            lng: Number(park.longitude),
          },
        ]}
      />
    </div>
  );
};

export default Details;
