"use client";

import { ParkDetail, ParkResponse } from "@/nps-api/parks/types";
import axios from "axios";
import { useQuery } from "react-query";

interface VisitedParksProps {
  parks: ParkDetail[];
}

const fetchVisitedParks = async (): Promise<ParkResponse> => {
  const { data: visitedParks } = await axios.get(
    "https://developer.nps.gov/api/v1/parks",
    {
      headers: {
        Accept: "application/json",
      },
      params: {
        api_key: process.env.NP_API_KEY,
        parkCode: ["abli", "acad", "agfo"].toString(),
      },
    }
  );
  return visitedParks;
};

const VisitedParks: React.FC<VisitedParksProps> = ({ parks }) => {
  const { data: visitedParks } = useQuery("visitedParks", fetchVisitedParks);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {visitedParks.data.map((park) => (
        <div key={park.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold mb-2 text-rocks-canyons">
              {park.fullName}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VisitedParks;
