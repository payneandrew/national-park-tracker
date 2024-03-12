import { USStates } from '@/mocks/states';
import Link from 'next/link';

export default function StatesPage() {
  const states = Object.entries(USStates).map(([stateCode, stateName]) => ({
    stateCode,
    stateName,
  }));
  return (
    <>
      <h1 className="text-3xl font-semibold mb-4 text-copper-brown">
        Explore Parks by State
      </h1>
      <div className="flex min-h-screen flex-col justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min">
          {states.map(({ stateCode, stateName }) => (
            <Link
              key={stateCode}
              href={{ pathname: `/state/${stateCode}` }}
              className="rounded overflow-hidden shadow-lg p-4 bg-black-leather-jacket transform transition-transform duration-200 hover:scale-105"
            >
              <p className="font-bold text-xl mb-2 text-white text-bold">
                {stateName}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
