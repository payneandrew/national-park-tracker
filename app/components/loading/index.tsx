import { ClipLoader } from "react-spinners";

const Loading: React.FC = () => {
  return (
    <ClipLoader
      color={"#663300"}
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
export default Loading;
