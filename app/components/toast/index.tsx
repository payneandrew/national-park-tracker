import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={`toast-wrapper fixed top-0 right-0 z-50 p-4 transition-transform ${
        visible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex toast bg-gray-100 border border-gray-300 rounded p-4 transition-transform transform hover:scale-105 items-center">
        <p>{message}</p>
        <button
          onClick={handleClose}
          className="ml-4 p-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Toast;
