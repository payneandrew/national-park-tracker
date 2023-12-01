'use client';

import { useParksState } from '@/app/hooks/use-parks-state';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Error from '../error';
import Loading from '../loading';
import ParkImage from '../park-image';
import Toast from '../toast';

interface ParksProps {
  stateCode: string;
}

const Parks: React.FC<ParksProps> = ({ stateCode }) => {
  const [showVisitedToast, setShowVisitedToast] = useState(false);
  const [showRemovedToast, setShowRemovedToast] = useState(false);
  const [showError, setShowError] = useState(false);

  const { data: parks, mutate, isLoading } = useParksState(stateCode);

  const handleSetVisited = async (parkCode: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/visited-parks/${parkCode}`
      );

      if (response.status === 201) {
        setShowVisitedToast(true);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
    }
  };

  const handleSetRemoved = async (parkCode: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/visited-parks/${parkCode}`
      );

      if (response.status === 200) {
        setShowRemovedToast(true);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parks &&
          parks.data.map((park) => (
            <div key={park.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <Link href={`/park-detail/${park.parkCode}`}>
                  <h2 className="text-xl font-semibold mb-2 text-rocks-canyons">
                    {park.fullName}
                  </h2>
                </Link>
                {process.env.NEXT_PUBLIC_VISITED_PARKS_ENABLED === 'true' && (
                  <button
                    title={
                      park.visited
                        ? 'Click to remove park from your list of visited parks.'
                        : 'Click to add park to your list of visited parks.'
                    }
                    className="flex-shrink-0"
                    onClick={() => {
                      park.visited
                        ? handleSetRemoved(park.parkCode)
                        : handleSetVisited(park.parkCode);
                      mutate();
                    }}
                    data-cy="add-remove-park-button"
                  >
                    <Image
                      src={
                        park.visited
                          ? '/icons/checked.png'
                          : '/icons/unchecked.png'
                      }
                      alt={park.visited ? 'Visited' : 'Not Visited'}
                      width={50}
                      height={50}
                      className="cursor-pointer transform transition-transform duration-200 hover:scale-125"
                    />
                  </button>
                )}
              </div>

              <div className="flex flex-col items-center justify-center relative">
                <p className="text-gray-700">{park.description}</p>
                {park.images && park.images[0] && (
                  <ParkImage width={300} height={300} image={park.images[0]} />
                )}
              </div>
              {showVisitedToast && (
                <Toast
                  message="Parked added to the list!"
                  onClose={() => setShowVisitedToast(false)}
                />
              )}
              {showRemovedToast && (
                <Toast
                  message="Parked removed from the list"
                  onClose={() => setShowRemovedToast(false)}
                />
              )}
              {showError && (
                <Error
                  message="There was an unexpected error"
                  onClose={() => setShowError(false)}
                />
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default Parks;
