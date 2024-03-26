import { ButtonProps } from '@/types/types';

const Button = ({
  value,
  text,
  onTouchEnd,
  onClick,
  className
}: ButtonProps) => {
  return (
    <button
      value={value}
      onTouchEnd={onTouchEnd}
      onClick={onClick}
      className={className}>
      {text}
    </button>
  );
};

export default Button;
