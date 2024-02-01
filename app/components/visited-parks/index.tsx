'use client';

import Loading from '@/app/loading';
import { fetcher } from '@/app/utils/api';
import { ParkResponse } from '@/nps-api/parks/types';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

const VisitedParks: React.FC = () => {
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

  const visitedParks = data?.data || [];

  return (
    <div className="flex items-center justify-center">
      {!isLoading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visitedParks.map((park) => (
              <Link key={park.id} href={`/park-detail/${park.parkCode}`}>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold mb-2 text-rocks-canyons">
                      {park.fullName}
                    </h2>
                    <Image
                      src="/icons/checked.png"
                      alt="Visited"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {visitedParks.length <= 0 && (
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
