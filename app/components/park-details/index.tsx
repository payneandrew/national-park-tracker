import { ParkDetail } from '@/nps-api/parks/types';
import Link from 'next/link';
import Slideshow from '../slideshow';

interface ParkDetailsProps {
  park: ParkDetail;
}

const ParkDetails: React.FC<ParkDetailsProps> = ({ park }) => {
  return (
    <div className="p-4 md:p-8 bg-white shadow-md rounded-lg flex flex-col gap-4">
      <h1 className="text-xl font-semibold mb-2 text-rocks-canyons">
        {park.fullName}
      </h1>
      <p className="text-gray-700">
        <strong>Description:</strong> {park.description}
      </p>
      <p className="text-gray-700">
        <strong>Directions:</strong> {park.directionsInfo}
      </p>

      <p className="text-gray-700">
        <strong>Weather Information:</strong> {park.weatherInfo}
      </p>

      <Link href={park.directionsUrl} className="underline text-blue-500">
        Get Directions
      </Link>

      {park.entranceFees && park.entranceFees.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2 text-rocks-canyons">
            Entrance Fees
          </h2>
          {park.entranceFees.map((fee, index) => (
            <div className="mb-4 p-4 bg-gray-100 rounded-lg" key={index}>
              <h3 className="font-bold text-gray-700">{fee.title}</h3>
              <p>
                <strong>Cost:</strong> ${fee.cost}
              </p>
              <p>
                <strong>Description:</strong> {fee.description}
              </p>
            </div>
          ))}
        </>
      )}
      {park.images && park.images.length > 0 && (
        <Slideshow images={park.images} />
      )}
    </div>
  );
};

export default ParkDetails;
