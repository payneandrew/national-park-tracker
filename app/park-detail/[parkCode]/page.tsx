'use client';

import CampingInfo from '@/app/components/camping-tab';
import Details from '@/app/components/park-detail';
import { useParksParkcode } from '@/app/hooks/use-parks-parkcode';
import TabGroup from '../../components/tab-group';

interface ParkDetailsProps {
  children: React.ReactNode;
}

const ParkDetailsPage: React.FC<ParkDetailsProps> = ({ children }) => {
  const { data: park } = useParksParkcode('alag');
  const parkData = park?.data[0];

  const tabs = [
    {
      name: 'Details',
      component: <Details park={parkData!} />,
    },
    { name: 'Camping', component: <CampingInfo park={parkData!} /> },
  ];
  return (
    <>
      {parkData && (
        <div className="p-4 md:p-8 bg-white shadow-md rounded-lg flex flex-col gap-4">
          <TabGroup tabs={tabs} />
          {children}
        </div>
      )}
    </>
  );
};

export default ParkDetailsPage;
