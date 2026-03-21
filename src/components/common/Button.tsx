import { ButtonProps } from '@/types/types';

const Button = ({
  value,
  text,
  onClick,
  className,
  children,
  disabled
}: ButtonProps) => {
  return (
    <button
      value={value}
      onClick={onClick}
      className={className}
      disabled={disabled}>
      {children}
      {text}
    </button>
  );
};

export default Button;
