import { ButtonProps } from '@/types/types';

const Button = ({ value, text, onClick, className, children }: ButtonProps) => {
  return (
    <button
      value={value}
      onClick={onClick}
      className={className}>
      {children}
      {text}
    </button>
  );
};

export default Button;
