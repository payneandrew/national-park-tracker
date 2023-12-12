'use client';

import { useSurveyContext } from '@/app/hooks/use-survey-context';
import { Activities } from '@/nps-api/parks/types';

interface ActivitiesProps {
  activities: Activities[];
}

const ActivitiesGrid: React.FC<ActivitiesProps> = ({ activities }) => {
  const { chooseActivity, chosenActivities } = useSurveyContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {activities.map((activity) => {
        const isActivityChosen = !!chosenActivities.find(
          (chosenActivity) => chosenActivity.id === activity.id
        );

        return (
          <button
            key={activity.id}
            className={`rounded overflow-hidden shadow-lg p-4 transform transition-transform duration-200 hover:scale-105 ${
              isActivityChosen ? 'bg-green-500' : 'bg-wood-trees'
            }`}
            onClick={() => chooseActivity(activity)}
          >
            <p className="font-bold text-xl mb-2 text-white text-bold">
              {activity.name}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default ActivitiesGrid;
