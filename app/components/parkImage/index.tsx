'use client';

import { ParkImage } from '@/nps-api/parks/types';
import Image from 'next/image';
import { useState } from 'react';
import Loading from '../loading';

interface ParkImageProps {
  image: ParkImage;
  width: number;
  height: number;
}

const ParkImage: React.FC<ParkImageProps> = ({ image, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loading />
        </div>
      )}
      <Image
        src={image.url}
        alt={image.altText}
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        className={`object-contain transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default ParkImage;
