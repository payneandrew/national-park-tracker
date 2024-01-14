import { USStates } from '@/mocks/states';

export default function Page() {
  const states = Object.entries(USStates).map(([stateCode, stateName]) => ({
    stateCode,
    stateName,
  }));

  return (
    <>
      <main className="flex h-screen w-screen landing-page-background">
        <h1 className="text-8xl font-semibold m-4 text-white">
          Explore America's National Parks
        </h1>
      </main>
    </>
  );
}
