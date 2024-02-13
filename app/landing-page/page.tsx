import SquareContainer from '../components/square-container';

export default function LandingPage() {
  return (
    <>
      <div className="flex items-center flex-col">
        <h2 className="text-copper-brown justify-center mb-6 font-schibsted-grotesk font-bold">
          Welcome to National Park Tracker!
        </h2>
        <div className="text-center mb-6">
          <h1 className="text-7xl text-copper-brown mb-4 font-abril-fatface">
            Your nature adventure begins
          </h1>
          <p className="text-xl text-copper-brown mx-auto max-w-xl font-schibsted-grotesk">
            Ever felt like becoming the ultimate park ranger without getting the
            dirt off your hiking boots? Now, you can! With Park Tracker, we make
            your national park exploration dreams come true—virtually.
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <SquareContainer
            src="/images/rafting.jpeg"
            backgroundColor="coffee-brown"
          />
          <SquareContainer
            src="/images/walking-in-the-woods.jpeg"
            backgroundColor="national-park-green"
          />
          <SquareContainer
            src="/images/water.jpeg"
            backgroundColor="coffee-brown"
          />
          <SquareContainer
            src="/images/sunset.jpeg"
            backgroundColor="national-park-green"
          />
          <SquareContainer
            src="/images/rafting.jpeg"
            backgroundColor="coffee-brown"
          />
        </div>
      </div>
    </>
  );
}
