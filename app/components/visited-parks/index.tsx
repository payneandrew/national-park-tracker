'use client';

import useVisitedParks from '@/app/hooks/use-visited-parks';
import Loading from '@/app/loading';
import { fetcher } from '@/app/utils/api';
import { ParkResponse } from '@/nps-api/parks/types';
import useSWR from 'swr';
import ImageTile from '../image-tile';

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

  const storageVisitedParksCodes: string[] | null = getStoredVisitedParkCodes();

  const shouldFetchData =
    storageVisitedParksCodes && storageVisitedParksCodes.length !== 0;

  const { data, error, isLoading } = useSWR<ParkResponse>(
    shouldFetchData
      ? `https://developer.nps.gov/api/v1/parks?api_key=${
          process.env.NEXT_PUBLIC_NP_API_KEY
        }&parkCode=${storageVisitedParksCodes.join(',')}`
      : null,
    fetcher
  );

  const visitedParks = shouldFetchData ? data?.data : [];

  return (
    <div>
      {!isLoading && visitedParks ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visitedParks.map((park) => {
              return (
                <ImageTile
                  key={park.id}
                  park={park}
                  isParkVisited={isParkVisited}
                  toggleVisited={toggleVisited}
                />
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
