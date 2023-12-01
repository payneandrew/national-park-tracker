'use client';

import { SurveyProvider } from '@/app/context/survey-context';
import { useSurveyContext } from '@/app/hooks/use-survey-context';
import { Amenities } from '@/nps-api/parks/types';

interface AmenitiesProps {
  amenities: Amenities[];
}

const AmenitiesGrid: React.FC<AmenitiesProps> = ({ amenities }) => {
  const { chooseAmenity } = useSurveyContext();
  return (
    <SurveyProvider>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {amenities.map((amenity) => (
          <button
            key={amenity.id}
            className="rounded overflow-hidden shadow-lg p-4 bg-wood-trees transform transition-transform duration-200 hover:scale-105"
            onClick={() => chooseAmenity(amenity)}
          >
            <p className="font-bold text-xl mb-2 text-white text-bold">
              {amenity.name}
            </p>
          </button>
        ))}
      </div>
    </SurveyProvider>
  );
};

export default AmenitiesGrid;
