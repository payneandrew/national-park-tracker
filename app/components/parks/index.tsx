"use client";

import Image from "next/image";

interface ParksProps {
  parks: any[];
}

const Parks: React.FC<ParksProps> = ({ parks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {parks.map((park) => (
        <div key={park.id} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-rocks-canyons">
            {park.fullName}
          </h2>
          <p className="text-gray-700">{park.description}</p>
          {park.images[0] && (
            <Image
              src={park.images[0].url}
              alt={park.images[0].altText}
              width={100}
              height={100}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Parks;
