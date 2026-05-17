import Icon from '@/components/common/Icon';
import { brandMapToKor } from '@/utils/convertBrandName';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import {
  commonBaseSize,
  commonSmSize,
  defalutInput,
  DefaultBorder,
  DisabledBtn,
  OnSelectBorder,
  SelectedInput,
  SeletedBorder
} from '@/styles/styles';
import { Align, Flex } from '@/styles/layout';

const SelectBtn = ({
  defalutValue,
  selectedValue,
  isSelect,
  selectRef,
  onClick: handleTouch,
  disabled,
  className
}: {
  defalutValue: string;
  selectedValue?: string;
  isSelect: boolean;
  selectRef: React.RefObject<HTMLButtonElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  className?: string;
}) => {
  const slectBoxStyle =
    className === 'commonBaseSize' ? commonBaseSize : commonSmSize;

  return (
    <SelectBox
      className={cx(
        slectBoxStyle,
        Align,
        disabled ? DisabledBtn : undefined,
        selectedValue
          ? SeletedBorder
          : isSelect
            ? OnSelectBorder
            : DefaultBorder
      )}
      onClick={handleTouch}
      ref={selectRef}>
      <DefalutOption
        className={cx(
          Flex,
          selectedValue ? SelectedInput : isSelect ? undefined : defalutInput
        )}>
        {brandMapToKor(selectedValue || defalutValue)}
      </DefalutOption>
      <Icon {...iconPropsGenerator('select', '18')} />
    </SelectBox>
  );
};

const SelectBox = styled.button`
  width: 100%;
  border-radius: 10px;
  padding: 16px;
  justify-content: space-between;
`;

const DefalutOption = styled.div`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default SelectBtn;
