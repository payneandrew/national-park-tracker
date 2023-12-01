'use client';

import { useSurveyContext } from '@/app/hooks/use-survey-context';
import { USStates } from '@/mocks/states';
import { Activities, ParkData } from '@/nps-api/parks/types';
import Link from 'next/link';

interface SurveyResultsProps {
  parks: ParkData;
}

const SurveyResults: React.FC<SurveyResultsProps> = ({ parks }) => {
  const { chosenAmenities, chosenActivities } = useSurveyContext();

  //   function filterParks(
  //     parks: ParkData,
  //     activities: Activities[],
  //     amenities: Amenities[]
  //   ) {
  //     const selectedActivityIds = activities.map((activity) => activity.id);
  //     const selectedAmenityIds = amenities.map((amenity) => amenity.id);

  //     return parks.filter(
  //       (park) =>
  //         park.activities.some((activity) =>
  //           selectedActivityIds.includes(activity.id)
  //         ) &&
  //         park.amenities.some((amenity) =>
  //           selectedAmenityIds.includes(amenity.id)
  //         )
  //     );
  //   }

  function filterParksByActivities(parks: ParkData, activities: Activities[]) {
    const selectedActivityIds = activities.map((activity) => activity.id);
    return parks.filter((park) =>
      park.activities.some((activity) =>
        selectedActivityIds.includes(activity.id)
      )
    );
  }

  const recommendedParks = filterParksByActivities(parks, chosenActivities);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {recommendedParks.map((park) => {
        const statesFullNames = park.states
          .split(',')
          .filter((stateCode) => stateCode && stateCode.trim() !== '')
          .map(
            (stateCode) => USStates[stateCode.trim() as keyof typeof USStates]
          )
          .filter((name) => name)
          .join(', ');

        return (
          <div
            key={park.id}
            className="mb-6 flex flex-col overflow-hidden rounded-lg shadow-lg"
          >
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm leading-5 font-medium text-green-600">
                  {statesFullNames}
                </p>
                <Link href={`/park-detail/${park.parkCode}`}>
                  <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
                    {park.fullName}
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SurveyResults;
