import Link from "next/link";

interface StatesProps {
  states: string[];
}

const States: React.FC<StatesProps> = ({ states }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {states.map((state) => (
        <div
          key={state}
          className="rounded overflow-hidden shadow-lg p-4 bg-wood-trees"
        >
          <Link
            href={`/${state}?state=${state}`}
            className="font-bold text-xl mb-2 text-white hover:text-green-600 text-bold"
          >
            {state}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default States;
