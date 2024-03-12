import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SquareContainerProps {
  backgroundColor: string;
  src: string;
  delay?: number;
}

const SquareContainer: React.FC<SquareContainerProps> = ({
  backgroundColor,
  src,
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`bg-${backgroundColor} rounded-3xl w-full lg:w-96 h-96 flex items-center justify-center transition-opacity duration-500 ease-in ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Image
        src={src}
        alt="test"
        width={800}
        height={800}
        className="w-full h-full object-cover p-7"
        style={{ opacity: 0.7 }}
      />
    </div>
  );
};

export default SquareContainer;
