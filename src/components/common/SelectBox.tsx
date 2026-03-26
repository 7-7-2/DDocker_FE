import { useRef } from 'react';
import SelectBtn from '@/components/common/SelectBtn';
import SelectOption from '@/components/common/SelectOption';
import { useSelectBox } from '@/hooks/useSelectBox';
import { styled } from 'styled-system/jsx';

const SelectBox = ({
  value: selectedValue,
  defaultValue,
  data,
  onClick: handleClick,
  className
}: {
  value?: string;
  defaultValue: string;
  data: string[];
  onClick: React.MouseEventHandler<HTMLElement>;
  className?: string;
}) => {
  const selectRef = useRef<HTMLButtonElement>(null);
  const { isSelect, handleSelectClick } = useSelectBox(selectRef);
  const disabled = data === undefined && true;

  return (
    <SelectBoxContainer>
      <SelectBtn
        selectRef={selectRef}
        selectedValue={selectedValue}
        defalutValue={defaultValue}
        isSelect={isSelect}
        onClick={handleSelectClick}
        disabled={disabled}
        className={className}
      />
      <SelectOption
        data={data}
        isSelect={isSelect}
        onClick={handleClick}
      />
    </SelectBoxContainer>
  );
};

const SelectBoxContainer = styled.div`
  width: 100%;
  flex-grow: 1;
`;

export default SelectBox;
