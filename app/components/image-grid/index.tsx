'use client';

import { Images } from '@/nps-api/parks/types';
import Image from 'next/image';
import { useState } from 'react';

interface ImageGridProps {
  images: Images;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, id) => (
          <button
            key={id}
            className="transform transition-transform duration-200 hover:scale-105"
            onClick={() => openModal(image.url)}
          >
            <Image
              src={image.url}
              alt={image.altText}
              width={800}
              height={800}
              className="w-full h-full object-cover rounded-md"
            />
          </button>
        ))}
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 cursor-pointer"
          onClick={closeModal}
        >
          <dialog
            open
            className="flex flex-col fixed inset-0 rounded bg-white p-4"
          >
            <Image
              src={selectedImage}
              alt="Selected Image"
              width={800}
              height={800}
              className="w-full h-full object-cover rounded-md"
            />
          </dialog>
        </div>
      )}
    </>
  );
};

export default ImageGrid;
