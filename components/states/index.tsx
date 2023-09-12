interface StatesProps {
  states: string[];
}

const States: React.FC<StatesProps> = ({ states }) => {
  return states.map((state) => <div key={state}>{state}</div>);
};

export default States;
