'use client';

import { useSurveyContext } from '@/app/hooks/use-survey-context';
import { Activities, ParkData } from '@/nps-api/parks/types';

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

  console.log(recommendedParks);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ul>
        {recommendedParks.map((park) => (
          <li key={park.id}>{park.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyResults;
