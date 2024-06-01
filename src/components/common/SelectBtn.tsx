import Icon from '@/components/common/Icon';
import convertBrandName from '@/utils/convertBrandName';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { DisabledBtn, SmStyle } from '@/styles/styles';
import { Align, Flex } from '@/styles/layout';

const SelectBtn = ({
  defalutValue,
  selectedValue,
  isSelect,
  selectRef,
  onClick: handleTouch,
  disabled
}: {
  defalutValue: string;
  selectedValue?: string;
  isSelect: boolean;
  selectRef: React.RefObject<HTMLButtonElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}) => {
  return (
    <SelectBox
      className={cx(
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
      <DefalutOption className={cx(Flex, SelectInput, SmStyle)}>
        {convertBrandName(selectedValue || defalutValue)}
      </DefalutOption>
      <Icon {...iconPropsGenerator('select', '18')} />
    </SelectBox>
  );
};

const SelectBox = styled.button`
  width: 100%;
  height: 46px;
  border-radius: 10px;
  padding: 16px;
  justify-content: space-between;
`;

const SelectInput = css`
  background-color: transparent;
  outline: none;
`;

const DefalutOption = styled.div`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const DefaultBorder = css`
  border: 1px solid #ccc;
  background-color: #fff;
`;

const OnSelectBorder = css`
  border: 1px solid var(--colors-main);
  background-color: #fff;
`;

const SeletedBorder = css`
  border: 1px solid var(--colors-main);
  background-color: #fff4ee;
`;

export default SelectBtn;
