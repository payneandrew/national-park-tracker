import States from "@/components/states";
import { USStates } from "@/mocks/states";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <States states={USStates} />
    </main>
  );
}
