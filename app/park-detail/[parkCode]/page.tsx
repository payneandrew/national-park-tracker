'use client';

import CampingInfo from '@/app/components/camping-tab';
import Details from '@/app/components/park-detail';
import { useCampgroundsPark } from '@/app/hooks/use-campgrounds-park';
import { useParksParkcode } from '@/app/hooks/use-parks-parkcode';
import TabGroup from '../../components/tab-group';

const ParkDetailsPage = ({ params }: { params: { parkCode: string } }) => {
  const parkCode = params.parkCode;
  const { data: park } = useParksParkcode(parkCode);
  const parkData = park?.data[0];

  const { data: campgrounds } = useCampgroundsPark(parkCode);
  const campgroundsData = campgrounds?.data;

  const tabs = [
    {
      name: 'Details',
      component: <Details park={parkData!} />,
    },
    {
      name: 'Camping',
      component: (
        <CampingInfo park={parkData!} campgrounds={campgroundsData!} />
      ),
    },
  ];
  return (
    <>
      {parkData && campgroundsData && (
        <div className="p-4 md:p-8 bg-white shadow-md rounded-lg flex flex-col gap-4">
          <TabGroup tabs={tabs} />
        </div>
      )}
    </>
  );
};

export default ParkDetailsPage;
