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

  const { data, error, isLoading, mutate } = useSWR<ParkResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/visited-parks`,
    fetcher
  );

  const visitedParks = data?.data;

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
                  <div className="text-lg font-bold text-white absolute top-4 left-4 z-10">
                    <>
                      {process.env.NEXT_PUBLIC_VISITED_PARKS_ENABLED ===
                        'true' && (
                        <AddRemoveButton
                          park={park}
                          isParkVisited={isParkVisited}
                          toggleVisited={toggleVisited}
                        />
                      )}
                      <h2> {park.fullName}</h2>
                    </>
                  </div>
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
