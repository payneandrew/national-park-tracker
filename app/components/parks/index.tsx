"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ParksProps {
  parks: any[];
}

const Parks: React.FC<ParksProps> = ({ parks }) => {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageVisited = localStorage.getItem("visited");

      if (!storageVisited) {
        localStorage.setItem("visited", JSON.stringify([]));
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
      alert("Park removed from visited list.");
    } else {
      newVisited = [...visited, parkCode];
      alert("Park added to visited list!");
    }
    setVisited(newVisited);
    localStorage.setItem("visited", JSON.stringify(newVisited));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {parks.map((park) => (
        <div key={park.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold mb-2 text-rocks-canyons">
              {park.fullName}
            </h2>
            <button
              className="flex-shrink-0"
              onClick={() => {
                handleSetVisited(park.parkCode);
              }}
            >
              <Image
                src={
                  isParkVisited(park.parkCode)
                    ? "/icons/checked.png"
                    : "/icons/unchecked.png"
                }
                alt={isParkVisited(park.parkCode) ? "Visited" : "Not Visited"}
                width={50}
                height={50}
              />
            </button>
          </div>

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
