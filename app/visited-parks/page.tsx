import axios from "axios";
import VisitedParks from "../components/visited-parks";

export default async function VisitedParksPage() {
  const visitedParks = await axios.get(
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
  return (
    <>
      <h1 className="text-3xl font-semibold mb-4 text-white">Visited Parks</h1>
      <main className="flex min-h-screen flex-col justify-between p-24">
        <VisitedParks parks={visitedParks.data.data} />
      </main>
    </>
  );
}
