import { useEffect } from 'react';

interface ErrorProps {
  message: string;
  onClose: () => void;
}

const Error: React.FC<ErrorProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);
  return (
    <div className="error-wrapper fixed top-0 right-0 z-50 p-4">
      <div className="error bg-red-500 border border-gray-300 rounded p-4 transition-transform duration-200 hover:scale-105">
        <p>{message}</p>
      </div>
    </div>
    // <div className="error bg-red-500 text-white rounded p-4 mb-4">
    //   <p>{message}</p>
    // </div>
  );
};

export default Error;
