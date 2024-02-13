'use client';

import MapContainer from '@/app/components/map-container';
import { ParkDetail } from '@/nps-api/parks/types';

interface CampingInfoProps {
  park: ParkDetail;
  campgrounds: any[];
}

const CampingInfo: React.FC<CampingInfoProps> = ({ park, campgrounds }) => {
  const markerPositions = campgrounds.map((campground) => ({
    lat: Number(campground.latitude),
    lng: Number(campground.longitude),
    label: campground.name,
  }));

  return (
    <>
      <h1 className="text-3xl font-semibold mb-2 text-copper-brown">
        {`${park.fullName} Campgrounds`}
      </h1>
      {campgrounds.length > 0 && (
        <MapContainer markerPositions={markerPositions} zoom={9} />
      )}

      {campgrounds.length === 0 ? (
        <p className="flex items-center justify-center my-12">
          No campgrounds here yet!
        </p>
      ) : (
        campgrounds.map((campground) => (
          <div key={campground.id} className="py-2">
            <h2 className="text-lg font-semibold text-copper-brown">
              {campground.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-2">Total Sites</h2>
                <p> {campground.campsites.totalSites}</p>
              </div>

              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-2">Electric Hookups</h2>
                <p>{campground.campsites.electricalHookups}</p>
              </div>

              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-2">RV Only</h2>
                <p>{campground.campsites.rvOnly}</p>
              </div>

              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-2">Tent Only</h2>
                <p>{campground.campsites.tentOnly}</p>
              </div>

              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-2">Walk to/Boat to</h2>
                <p>{campground.campsites.walkBoatTo}</p>
              </div>

              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-2">Group</h2>
                <p>{campground.campsites.group}</p>
              </div>

              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-2">Horse</h2>
                <p>{campground.campsites.horse}</p>
              </div>

              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-2">Other</h2>
                <p>{campground.campsites.other}</p>
              </div>
            </div>
            <p className="text-gray-700"> {campground.description}</p>
          </div>
        ))
      )}
    </>
  );
};

export default CampingInfo;
