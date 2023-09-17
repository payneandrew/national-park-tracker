'use client';

import { ParkDetail } from '@/nps-api/parks/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

const VisitedParks: React.FC = () => {
  const [visitedParks, setVisitedParks] = useState<ParkDetail[]>([]);

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

  useEffect(() => {
    if (storageVisitedParksCodes) {
      axios
        .get('http://localhost:3000/api/parks', {
          headers: {
            Accept: 'application/json',
          },
          params: {
            parkCode: storageVisitedParksCodes
              ? storageVisitedParksCodes.join(',')
              : '',
          },
        })
        .then(({ data }) => setVisitedParks(data.data))
        .catch((error) => console.error(error));
    }
  }, [storageVisitedParksCodes]);

  return (
    <div className=" flex items-center justify-center">
      {visitedParks.length > 0 ? (
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
        <h2 className="text-xl font-bold text-rocks-canyons">
          You havent selected any parks yet!
        </h2>
      )}
    </div>
  );
};

export default VisitedParks;
