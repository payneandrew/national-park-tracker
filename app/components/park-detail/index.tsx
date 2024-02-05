'use client';

import ImageGrid from '@/app/components/image-grid';
import MapContainer from '@/app/components/map-container';
import useVisitedParks from '@/app/hooks/use-visited-parks';
import { ParkDetail } from '@/nps-api/parks/types';
import AddRemoveButton from '../add-remove-button';

interface DetailsProps {
  park: ParkDetail;
}

const Details: React.FC<DetailsProps> = ({ park }) => {
  const { isParkVisited, toggleVisited } = useVisitedParks();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center gap-2">
        <h1 className="text-3xl font-semibold text-rocks-canyons">
          {park.fullName}
        </h1>
        {process.env.NEXT_PUBLIC_VISITED_PARKS_ENABLED === 'true' && (
          <AddRemoveButton
            park={park}
            isParkVisited={isParkVisited}
            toggleVisited={toggleVisited}
          />
        )}
      </div>
      <MapContainer
        markerPositions={[
          {
            lat: Number(park.latitude),
            lng: Number(park.longitude),
          },
        ]}
      />
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
      <h2 className="text-lg font-semibold text-rocks-canyons">Directions</h2>
      <p className="text-gray-700">{park.directionsInfo}</p>
      {park.images && park.images.length > 0 && (
        <ImageGrid images={park.images} />
      )}
    </div>
  );
};

export default Details;
