'use client';

import Loading from '@/app/loading';
import { ParkResponse } from '@/nps-api/parks/types';
import axios from 'axios';
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
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR<ParkResponse>(
    `http://localhost:3000/api/parks?parkCode=${
      storageVisitedParksCodes ? storageVisitedParksCodes.join(',') : ''
    }`,
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
