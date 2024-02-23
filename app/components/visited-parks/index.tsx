'use client';

import useVisitedParks from '@/app/hooks/use-visited-parks';
import Loading from '@/app/loading';
import { fetcher } from '@/app/utils/api';
import { ParkResponse } from '@/nps-api/parks/types';
import useSWR from 'swr';
import ImageTile from '../image-tile';

const VisitedParks: React.FC = () => {
  const { isParkVisited, toggleVisited } = useVisitedParks();

  const { data, error, isLoading, mutate } = useSWR<ParkResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/visited-parks`,
    fetcher
  );

  const visitedParks = data?.data;

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
