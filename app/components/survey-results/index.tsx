'use client';

import { useSurveyContext } from '@/app/hooks/use-survey-context';
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
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">
        {recommendedParks.length > 0
          ? `${recommendedParks.length} Results`
          : 'No Results Found'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {recommendedParks.length > 0 &&
          recommendedParks.map((park) => {
            const backgroundImageStyle = park.images
              ? {
                  backgroundImage: `url(${park.images[0].url})`,
                }
              : { backgroundColor: 'white' };

            return (
              <Link
                className="pt-2 px-2 rounded-lg shadow-md relative overflow-hidden"
                key={park.id}
                href={`/park-detail/${park.parkCode}`}
                style={{
                  ...backgroundImageStyle,
                  backgroundSize: 'cover',
                  width: '300px',
                  height: '200px',
                }}
              >
                <div className="absolute inset-0 bg-black opacity-40 hover:opacity-0 transition-opacity"></div>
                <h2 className="text-lg font-bold text-white absolute top-4 left-4 z-10">
                  {park.fullName}
                </h2>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
export default SurveyResults;
