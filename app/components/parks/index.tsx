"use client";

import Image from "next/image";

interface ParksProps {
  parks: any[];
}

const Parks: React.FC<ParksProps> = ({ parks }) => {
  if (!localStorage.getItem("visited")) {
    localStorage.setItem("visited", JSON.stringify([]));
  }

  const visited = JSON.parse(localStorage.getItem("visited")!);

  const isParkVisited = (parkId: string) => {
    return visited.includes(parkId);
  };

  const setVisited = (parkId: string) => {
    localStorage.setItem("visited", JSON.stringify([...visited, parkId]));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {parks.map((park) => (
        <div key={park.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold mb-2 text-rocks-canyons">
              {park.fullName}
            </h2>
            <button
              className="flex-shrink-0"
              onClick={() => setVisited(park.id)}
            >
              <Image
                src={
                  isParkVisited(park.id)
                    ? "/icons/checked.png"
                    : "/icons/unchecked.png"
                }
                alt={isParkVisited(park.id) ? "Visited" : "Not Visited"}
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
