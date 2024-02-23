import VisitedParks from '../components/visited-parks';

export default async function VisitedParksPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-4 text-white">Visited Parks</h1>
      <main className="flex min-h-screen flex-col justify-between">
        <VisitedParks />
      </main>
    </>
  );
}
