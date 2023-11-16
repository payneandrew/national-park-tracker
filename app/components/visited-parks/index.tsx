'use client';

import Loading from '@/app/loading';
import { fetcher } from '@/app/utils/api';
import { ParkResponse } from '@/nps-api/parks/types';
import Image from 'next/image';
import useSWR from 'swr';

const VisitedParks: React.FC = () => {
  const { data, error, isLoading } = useSWR<ParkResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/visited-parks`,
    fetcher
  );

  const visitedParks = data?.data || [];

  return (
    <div className=" flex items-center justify-center">
      {!isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visitedParks.map((park) => (
            <div key={park.id} className="bg-white p-4 rounded-lg shadow-md">
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
          ))}
        </div>
      ) : (
        <Loading />
      )}
      {error && <div>There was an error loading the parks.</div>}
    </div>
  );
};

export default VisitedParks;
