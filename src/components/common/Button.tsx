import { ButtonProps } from '@/types/types';

const Button = ({ value, text, onTouchEnd }: ButtonProps) => {
  return (
    <button
      value={value}
      onTouchEnd={onTouchEnd}>
      {text}
    </button>
  );
};

export default Button;
