'use client';

import { Activities, Amenities } from '@/nps-api/parks/types';
import { createContext, useState } from 'react';

type SurveyContextType = {
  chosenActivities: Activities[];
  chooseActivity: (activity: Activities) => void;
  chosenAmenities: Amenities[];
  chooseAmenity: (amenity: Amenities) => void;
};

export const SurveyContext = createContext<SurveyContextType | undefined>(
  undefined
);

type SurveyProviderProps = {
  children: React.ReactNode;
};

export const SurveyProvider: React.FC<SurveyProviderProps> = ({ children }) => {
  const [chosenActivities, setChosenActivities] = useState<Activities[]>([]);
  const [chosenAmenities, setChosenAmenities] = useState<Amenities[]>([]);

  console.log('chosenActivities', chosenActivities);

  console.log('chosenAmenities', chosenAmenities);

  const chooseActivity = (activity: Activities) => {
    setChosenActivities((activities) => {
      const isActivityChosen = activities.find((act) => act.id === activity.id);
      if (isActivityChosen) {
        return activities.filter((act) => act.id !== activity.id);
      } else {
        return [...activities, activity];
      }
    });
  };

  const chooseAmenity = (amenity: Amenities) => {
    setChosenAmenities((amenities) => {
      const isActivityChosen = amenities.find((amen) => amen.id === amenity.id);
      if (isActivityChosen) {
        return amenities.filter((amen) => amen.id !== amenity.id);
      } else {
        return [...amenities, amenity];
      }
    });
  };

  return (
    <SurveyContext.Provider
      value={{
        chosenActivities,
        chooseActivity,
        chosenAmenities,
        chooseAmenity,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
