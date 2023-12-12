'use client';

import { useSurveyContext } from '@/app/hooks/use-survey-context';
import { USStates } from '@/mocks/states';
import { Activities, ParkData } from '@/nps-api/parks/types';
import Link from 'next/link';

interface SurveyResultsProps {
  parks: ParkData;
}

const SurveyResults: React.FC<SurveyResultsProps> = ({ parks }) => {
  const { chosenActivities } = useSurveyContext();

  // const { data: parksWithAmenities } = useAmenitiesParks(
  //   chosenAmenities.map((amenity) => amenity.id)
  // );

  // console.log('parksWithAmenities', parksWithAmenities);

  const filterParksByActivities = (
    parks: ParkData,
    activities: Activities[]
  ) => {
    const selectedActivityIds = activities.map((activity) => activity.id);
    return parks.filter((park) =>
      park.activities.some((activity) =>
        selectedActivityIds.includes(activity.id)
      )
    );
  };

  const recommendedParks = filterParksByActivities(parks, chosenActivities);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {recommendedParks.length > 0 ? (
        recommendedParks.map((park) => {
          const stateCodesArray = park.states.split(',');
          const stateNames = stateCodesArray
            .map((code) => USStates[code.trim() as keyof typeof USStates])
            .filter((name) => name) // remove any undefined names
            .join(', ');

          return (
            <Link
              className="mb-6 flex flex-col overflow-hidden rounded-lg shadow-lg"
              key={park.id}
              href={`/park-detail/${park.parkCode}`}
            >
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <>
                    <p className="text-sm font-medium text-green-600">
                      {stateNames}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-gray-900">
                      {park.fullName}
                    </h3>
                  </>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <h3 className="flex mt-2 text-xl">
          Sorry, no parks matched your criteria.
        </h3>
      )}
    </div>
  );
};
export default SurveyResults;
