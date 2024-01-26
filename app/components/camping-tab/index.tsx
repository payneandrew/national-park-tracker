'use client';

import MapContainer from '@/app/components/map-container';
import { ParkDetail } from '@/nps-api/parks/types';

interface CampingInfoProps {
  park: ParkDetail;
  campgrounds?: any[];
}

const CampingInfo: React.FC<CampingInfoProps> = ({ park, campgrounds }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-2 text-rocks-canyons">
        {park.fullName}
      </h1>
      <MapContainer
        markerPosition={{
          lat: Number(park.latitude),
          lng: Number(park.longitude),
        }}
      />
    </>
  );
};

export default CampingInfo;
