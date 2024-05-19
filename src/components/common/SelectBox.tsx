import { useRef } from 'react';
import SelectBtn from '@/components/common/SelectBtn';
import SelectOption from '@/components/common/SelectOption';
import { useSelectBox } from '@/hooks/useSelectBox';
import { styled } from 'styled-system/jsx';

const SelectBox = ({
  value: selectedValue,
  defaultValue,
  data,
  onTouchEnd: handleTouch
}: {
  value?: string;
  defaultValue: string;
  data: string[];
  onTouchEnd: React.TouchEventHandler<HTMLElement>;
}) => {
  const selectRef = useRef<HTMLButtonElement>(null);
  const { isSelect, handleSelectTouch } = useSelectBox(selectRef);

  return (
    <SelectBoxContainer>
      <SelectBtn
        selectRef={selectRef}
        selectedValue={selectedValue}
        defalutValue={defaultValue}
        isSelect={isSelect}
        onTouchEnd={handleSelectTouch}
      />
      <SelectOption
        data={data}
        isSelect={isSelect}
        onTouchEnd={handleTouch}
      />
    </SelectBoxContainer>
  );
};

const SelectBoxContainer = styled.div`
  width: 100%;
  flex-grow: 1;
`;

export default SelectBox;
