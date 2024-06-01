import { ButtonProps } from '@/types/types';

const Button = ({ value, text, onClick, className }: ButtonProps) => {
  return (
    <button
      value={value}
      onClick={onClick}
      className={className}>
      {text}
    </button>
  );
};

export default Button;
