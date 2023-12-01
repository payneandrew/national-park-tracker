import { SurveyContext } from '@/app/context/survey-context';
import { useContext } from 'react';

export const useSurveyContext = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurveyContext must be used within SurveyProvider');
  }
  return context;
};
