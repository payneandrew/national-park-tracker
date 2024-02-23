'use client';

import { ParkDetail } from '@/nps-api/parks/types';
import Link from 'next/link';
import AddRemoveButton from '../add-remove-button';

interface ImageTileProps {
  park: ParkDetail;
  isParkVisited?: (parkCode: string) => boolean;
  toggleVisited?: (
    parkCode: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

const ImageTile: React.FC<ImageTileProps> = ({
  park,
  isParkVisited,
  toggleVisited,
}) => {
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
        width: '100%',
        height: '12rem',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 hover:opacity-0 transition-opacity"></div>
      <div className="text-lg font-bold text-white absolute top-4 left-4 z-10">
        <>
          {process.env.NEXT_PUBLIC_VISITED_PARKS_ENABLED === 'true' &&
            isParkVisited &&
            toggleVisited && (
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
};

export default ImageTile;
