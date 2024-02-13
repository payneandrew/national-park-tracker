import Link from 'next/link';
import SquareContainer from './components/square-container';

export default function Page() {
  return (
    <>
      <div className="flex items-center flex-col gap-8">
        <div className="w-full relative">
          <div className=" border-copper-brown w-full border-t"></div>
          <h2 className="text-copper-brown justify-center font-schibsted-grotesk font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
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
        <div className="flex flex-row gap-3">
          <SquareContainer
            src="/images/rafting.jpeg"
            backgroundColor="black-leather-jacket"
          />
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
          <SquareContainer
            src="/images/rafting.jpeg"
            backgroundColor="black-leather-jacket"
          />
        </div>
      </div>
    </>
  );
}
