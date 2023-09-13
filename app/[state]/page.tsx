"use client";

import { parks } from "@/mocks/parks";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const StatePage = () => {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");

  const [nationalParks, setNationalParks] = useState([]);
  console.log(nationalParks);

  useEffect(() => {
    // Make the API request and update the state
    axios
      .get("parks")
      .then((response) => {
        setNationalParks(response.data.data);
      })
      .catch((error) => {
        console.error("API request error:", error);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>{`${state} Parks`}</title>
        <meta
          name="description"
          content="Explore national parks and plan your visits."
        />
      </Head>

      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">{`${state} Parks`}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parks[0].data.map((park) => (
            <div key={park.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 text-rocks-canyons">
                {park.fullName}
              </h2>
              <p className="text-gray-700">{park.description}</p>
              <Image
                src={park.images[0].url}
                alt={park.images[0].altText}
                width={100}
                height={100}
                layout="responsive"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatePage;
