import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="rounded p-2 m-2 bg-wood-trees cursor-pointer transform transition-transform duration-200 hover:scale-105 text-white shadow-lg"
    >
      {children}
    </button>
  );
};

export default Button;
