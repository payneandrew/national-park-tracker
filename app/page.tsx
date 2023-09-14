import States from "@/app/components/states";
import { USStates } from "@/mocks/states";

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-4 text-white">
        Explore Parks by State
      </h1>
      <main className="flex min-h-screen flex-col justify-between p-24">
        <States states={USStates} />
      </main>
    </>
  );
}
