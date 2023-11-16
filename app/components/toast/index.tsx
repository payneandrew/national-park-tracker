import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="toast-wrapper fixed top-0 right-0 z-50 p-4">
      <div className="toast bg-gray-100 border border-gray-300 rounded p-4 transition-transform duration-200 hover:scale-105">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Toast;
