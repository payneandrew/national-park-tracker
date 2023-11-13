import { ClipLoader } from 'react-spinners';

const PageLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ClipLoader
        color={'#663300'}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
export default PageLoading;
