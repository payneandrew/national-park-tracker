'use client';

import Link from 'next/link';
import ImageTile from './components/image-tile';
import Loading from './components/loading';
import MapContainerClustering from './components/map-container-clustering';
import SquareContainer from './components/square-container';
import { useAllParks } from './hooks/use-all-parks';

export default function Page() {
  const { data: parks, isLoading } = useAllParks();

  const getRandomPark = () => {
    return parks?.data[Math.floor(Math.random() * (Number(parks?.total) || 0))];
  };

  const randomParks = Array.from({ length: 4 }, () => getRandomPark());

  const markerPositions = parks?.data.map((park) => ({
    lat: Number(park.latitude),
    lng: Number(park.longitude),
    label: park.fullName,
  }));

  return (
    <>
      <div className="flex items-center flex-col gap-8 mb-36 ">
        <div className="w-full relative">
          <div className=" border-copper-brown w-full border-t"></div>
          <h2 className="text-copper-brown justify-center font-schibsted-grotesk font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-center">
            Welcome to National Park Tracker!
          </h2>
        </div>
        <div className="text-center">
          <h1 className="text-7xl text-copper-brown mb-4 font-abril-fatface">
            Your nature adventure begins
          </h1>
          <p className="text-xl text-copper-brown mx-auto max-w-xl font-schibsted-grotesk">
            Ever felt like becoming the ultimate park ranger without getting the
            dirt off your hiking boots? Now, you can! With Park Tracker, we make
            your national park exploration dreams come true—virtually.
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <Link
            className="py-2 px-3 bg-copper-brown rounded-3xl"
            href={'/states'}
          >
            <p className="text-white">Start Exploring</p>
          </Link>

          <Link
            className="py-2 px-3 bg-black-leather-jacket rounded-3xl"
            href={'/survey/activities'}
          >
            <p className="text-white">Find your park</p>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <SquareContainer
            src="/images/walking-in-the-woods.jpeg"
            backgroundColor="coffee-brown"
          />
          <SquareContainer
            src="/images/water.jpeg"
            backgroundColor="black-leather-jacket"
          />
          <SquareContainer
            src="/images/sunset.jpeg"
            backgroundColor="coffee-brown"
          />
        </div>
      </div>
      <div className="flex justify-start flex-col gap-6">
        <h2 className="text-3xl text-copper-brown mb-4 font-abril-fatface">
          Dive into a park
        </h2>
        {!isLoading && randomParks ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            {randomParks.map((randomPark) => {
              return randomPark ? (
                <ImageTile key={randomPark.id} park={randomPark} />
              ) : (
                <></>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        )}
        {parks && markerPositions && (
          <MapContainerClustering markerPositions={markerPositions} zoom={4} />
        )}
      </div>
    </>
  );
}
