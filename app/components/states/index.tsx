import Link from "next/link";

interface StatesProps {
  states: string[];
}

const States: React.FC<StatesProps> = ({ states }) => {
  return (
    <div>
      {states.map((state) => (
        <div key={state}>
          <Link href={`/${state}?state=${state}`}>{state}</Link>
        </div>
      ))}
    </div>
  );
};

export default States;
