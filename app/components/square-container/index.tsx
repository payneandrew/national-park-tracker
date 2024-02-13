import Image from 'next/image';

interface SquareContainerProps {
  backgroundColor: string;
  src: string;
}

const SquareContainer: React.FC<SquareContainerProps> = ({
  backgroundColor,
  src,
}) => {
  return (
    <div
      className={`bg-${backgroundColor} rounded-3xl w-96 h-96 flex items-center justify-center`}
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
