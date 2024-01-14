import VisitedParks from '../components/visited-parks';

export default async function VisitedParksPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold m-4 text-white">Visited Parks</h1>
      <main className="flex min-h-screen flex-col justify-between p-24">
        <VisitedParks />
      </main>
    </>
  );
}
