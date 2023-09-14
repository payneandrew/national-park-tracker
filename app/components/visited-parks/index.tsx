"use client";

interface VisitedParksProps {
  parks: any[];
}

const VisitedParks: React.FC<VisitedParksProps> = ({ parks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {parks.map((park) => (
        <div key={park.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold mb-2 text-rocks-canyons">
              {park.fullName}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VisitedParks;
