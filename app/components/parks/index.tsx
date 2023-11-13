'use client';

import { ParkDetail } from '@/nps-api/parks/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ParksProps {
  parks: ParkDetail[];
}

const Parks: React.FC<ParksProps> = ({ parks }) => {
  const [visited, setVisited] = useState<string[]>([]);

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
      alert('Park removed from visited list.');
    } else {
      newVisited = [...visited, parkCode];
      alert('Park added to visited list!');
    }
    setVisited(newVisited);
    localStorage.setItem('visited', JSON.stringify(newVisited));
  };

  const router = useRouter();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {parks.map((park) => (
        <div key={park.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <button
              onClick={() => router.push(`/park-detail/${park.parkCode}`)}
            >
              <h2 className="text-xl font-semibold mb-2 text-rocks-canyons">
                {park.fullName}
              </h2>
            </button>
            <button
              title={
                isParkVisited(park.parkCode)
                  ? 'Click to remove park from your list of visited parks.'
                  : 'Click to add park to your list of visited parks.'
              }
              className="flex-shrink-0"
              onClick={() => {
                handleSetVisited(park.parkCode);
              }}
            >
              <Image
                src={
                  isParkVisited(park.parkCode)
                    ? '/icons/checked.png'
                    : '/icons/unchecked.png'
                }
                alt={isParkVisited(park.parkCode) ? 'Visited' : 'Not Visited'}
                width={50}
                height={50}
                className="cursor-pointer transform transition-transform duration-200 hover:scale-125"
              />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center relative">
            <p className="text-gray-700">{park.description}</p>
            {park.images && park.images.length > 0 && (
              <Image
                src={park.images[0].url}
                alt={park.images[0].altText}
                width={300}
                height={300}
                className="object-contain"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Parks;
