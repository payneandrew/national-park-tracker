import States from "@/app/components/states";
import { USStates } from "@/mocks/states";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <States states={USStates} />
    </main>
  );
}
