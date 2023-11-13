'use client';

import { Images } from '@/nps-api/parks/types';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../button';

interface SlideshowProps {
  images: Images;
}

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    const newIndex = currentIndex - 1;
    if (newIndex < 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-200">
      <Button onClick={prevImage}>Prev</Button>
      <Image
        className="object-contain"
        src={images[currentIndex].url}
        alt={images[currentIndex].altText}
        width={800}
        height={800}
      />
      <Button onClick={nextImage}>Next</Button>
    </div>
  );
};

export default Slideshow;
