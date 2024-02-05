'use client';

import useVisitedParks from '@/app/hooks/use-visited-parks';
import Loading from '@/app/loading';
import { fetcher } from '@/app/utils/api';
import { ParkResponse } from '@/nps-api/parks/types';
import Link from 'next/link';
import useSWR from 'swr';
import AddRemoveButton from '../add-remove-button';

const VisitedParks: React.FC = () => {
  const { isParkVisited, toggleVisited } = useVisitedParks();
  const getStoredVisitedParkCodes = () => {
    if (typeof window !== 'undefined') {
      const storageVisited = localStorage.getItem('visited');
      if (storageVisited) {
        return JSON.parse(storageVisited);
      }
    }
    return null;
  };

  const storageVisitedParksCodes = getStoredVisitedParkCodes();

  const { data, error, isLoading } = useSWR<ParkResponse>(
    `https://developer.nps.gov/api/v1/parks?api_key=${
      process.env.NEXT_PUBLIC_NP_API_KEY
    }&parkCode=${
      storageVisitedParksCodes ? storageVisitedParksCodes.join(',') : ''
    }`,
    fetcher
  );

  const visitedParks = storageVisitedParksCodes ? data?.data : [];

  return (
    <div>
      {!isLoading && visitedParks ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visitedParks.map((park) => {
              const backgroundImageStyle = park.images
                ? {
                    backgroundImage: `url(${park.images[0].url})`,
                  }
                : { backgroundColor: 'white' };

              return (
                <Link
                  className="pt-2 px-2 rounded-lg shadow-md relative overflow-hidden"
                  key={park.id}
                  href={`/park-detail/${park.parkCode}`}
                  style={{
                    ...backgroundImageStyle,
                    backgroundSize: 'cover',
                    width: '300px',
                    height: '200px',
                  }}
                >
                  <div className="absolute inset-0 bg-black opacity-40 hover:opacity-0 transition-opacity"></div>

                  <h2 className="text-lg font-bold text-white absolute top-4 left-4 z-10">
                    {process.env.NEXT_PUBLIC_VISITED_PARKS_ENABLED ===
                      'true' && (
                      <AddRemoveButton
                        park={park}
                        isParkVisited={isParkVisited}
                        toggleVisited={toggleVisited}
                      />
                    )}

                    {park.fullName}
                  </h2>
                </Link>
              );
            })}
          </div>
          {visitedParks.length === 0 && (
            <div>You have not added any parks yet.</div>
          )}
          {error && <div>There was an error loading the parks.</div>}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default VisitedParks;
