import { ButtonProps } from '@/types/types';

const Button = ({ value, text, onTouchEnd, className }: ButtonProps) => {
  return (
    <button
      value={value}
      onTouchEnd={onTouchEnd}
      className={className}>
      {text}
    </button>
  );
};

export default Button;
