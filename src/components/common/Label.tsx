import { LabelProps } from '@/types/types';

export const Label = ({ inputValue, isAlert, label, message }: LabelProps) => {
  return (
    <div>
      {<div>{label}</div>}
      {isAlert && inputValue && <span>{message}</span>}
    </div>
  );
};
