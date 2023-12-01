'use client';

import { Activities } from '@/nps-api/parks/types';
import { createContext, useState } from 'react';

type SurveyContextType = {
  chosenActivities: Activities[];
  chooseActivity: (activity: Activities) => void;
};

export const SurveyContext = createContext<SurveyContextType | undefined>(
  undefined
);

type SurveyProviderProps = {
  children: React.ReactNode;
};

export const SurveyProvider: React.FC<SurveyProviderProps> = ({ children }) => {
  const [chosenActivities, setChosenActivities] = useState<Activities[]>([]);

  console.log(chosenActivities);

  const chooseActivity = (activity: Activities) => {
    setChosenActivities((activities) => [...activities, activity]);
  };

  return (
    <SurveyContext.Provider value={{ chosenActivities, chooseActivity }}>
      {children}
    </SurveyContext.Provider>
  );
};
