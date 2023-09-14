import { USStates } from "@/mocks/states";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-4 text-white">
        Explore Parks by State
      </h1>
      <main className="flex min-h-screen flex-col justify-between p-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {USStates.map((state) => (
            <div
              key={state}
              className="rounded overflow-hidden shadow-lg p-4 bg-wood-trees"
            >
              <Link
                href={{ pathname: `/${state}`, query: { state: `${state}` } }}
                className="font-bold text-xl mb-2 text-white hover:text-green-600 text-bold"
              >
                {state}
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
