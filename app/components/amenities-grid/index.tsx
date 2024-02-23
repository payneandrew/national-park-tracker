'use client';

import { useSurveyContext } from '@/app/hooks/use-survey-context';
import { Amenities } from '@/nps-api/parks/types';

interface AmenitiesProps {
  amenities: Amenities[];
}

const AmenitiesGrid: React.FC<AmenitiesProps> = ({ amenities }) => {
  const { chooseAmenity, chosenAmenities } = useSurveyContext();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {amenities.map((amenity) => {
        const isAmenityChosen = !!chosenAmenities.find(
          (chosenAmenity) => chosenAmenity.id === amenity.id
        );
        return (
          <button
            key={amenity.id}
            className={`rounded overflow-hidden shadow-lg p-4 transform transition-transform duration-200 hover:scale-105 ${
              isAmenityChosen ? 'bg-green-500' : 'bg-coffee-brown'
            }`}
            onClick={() => chooseAmenity(amenity)}
          >
            <p className="font-bold text-xl mb-2 text-white text-bold">
              {amenity.name}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default AmenitiesGrid;
