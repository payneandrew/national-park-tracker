import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  variant?: ButtonVariant;
}
export type ButtonVariant = 'primary' | 'secondary';

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
}) => {
  const buttonVariant: Record<ButtonVariant, string> = {
    primary: 'bg-coffee-brown',
    secondary: 'bg-mary-green',
  };

  return (
    <button
      onClick={onClick}
      className={`${buttonVariant[variant]} marker:-rounded p-2 m-2 bg-coffee-brown cursor-pointer transform transition-transform duration-200 hover:scale-105 text-white shadow-lg`}
    >
      {children}
    </button>
  );
};

export default Button;
