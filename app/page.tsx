import { USStates } from '@/mocks/states';
import Link from 'next/link';

export default function Page() {
  const states = Object.entries(USStates).map(([name, abbreviation]) => ({
    name,
    abbreviation,
  }));
  return (
    <>
      <h1 className="text-3xl font-semibold mb-4 text-white">
        Explore Parks by State
      </h1>
      <main className="flex min-h-screen flex-col justify-between p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {states.map(({ name, abbreviation }) => (
            <Link
              key={abbreviation}
              href={{ pathname: `/state/${abbreviation}` }}
              className="rounded overflow-hidden shadow-lg p-4 bg-wood-trees cursor-pointer transform transition-transform duration-200 hover:scale-105"
            >
              <p className="font-bold text-xl mb-2 text-white text-bold">
                {name}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
