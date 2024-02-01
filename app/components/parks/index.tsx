'use client';

import { useParksState } from '@/app/hooks/use-parks-state';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loading from '../loading';
import ParkImage from '../park-image';
import Toast from '../toast';

interface ParksProps {
  stateCode: string;
}

const Parks: React.FC<ParksProps> = ({ stateCode }) => {
  const [showVisitedToast, setShowVisitedToast] = useState(false);
  const [showRemovedToast, setShowRemovedToast] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);

  const { data: parks, isLoading } = useParksState(stateCode);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageVisited = localStorage.getItem('visited');

      if (!storageVisited) {
        localStorage.setItem('visited', JSON.stringify([]));
      } else {
        setVisited(JSON.parse(storageVisited));
      }
    }
  }, []);

  const isParkVisited = (parkCode: string) => {
    return visited.includes(parkCode);
  };

  const handleSetVisited = (parkCode: string) => {
    let newVisited: string[];

    if (visited.includes(parkCode)) {
      newVisited = visited.filter((id) => id !== parkCode);
      setShowRemovedToast(true);
    } else {
      newVisited = [...visited, parkCode];
      setShowVisitedToast(true);
    }
    setVisited(newVisited);
    localStorage.setItem('visited', JSON.stringify(newVisited));
  };

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      )}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parks &&
          parks.data.map((park) => (
            <Link
              className="bg-white p-4 rounded-lg shadow-md"
              key={park.id}
              href={`/park-detail/${park.parkCode}`}
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold mb-2 text-rocks-canyons">
                  {park.fullName}
                </h2>
                {process.env.NEXT_PUBLIC_VISITED_PARKS_ENABLED === 'true' && (
                  <button
                    title={
                      park.visited
                        ? 'Click to remove park from your list of visited parks.'
                        : 'Click to add park to your list of visited parks.'
                    }
                    className="flex-shrink-0"
                    onClick={() => {
                      handleSetVisited(park.parkCode);
                    }}
                    data-cy="add-remove-park-button"
                  >
                    <Image
                      src={
                        isParkVisited(park.parkCode)
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
            </Link>
          ))}
      </div>
    </>
  );
};

export default Parks;
