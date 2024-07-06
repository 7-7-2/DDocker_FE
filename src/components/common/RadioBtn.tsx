import { Align, Flex } from '@/styles/layout';
import { RadioBtnContainer } from '@/styles/styles';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const RadioBtn = ({
  color,
  className,
  id,
  selectedOption,
  fn: handleSelectOption
}: {
  className: string;
  id: string;
  fn?: React.ChangeEventHandler<HTMLElement>;
  selectedOption?: string | undefined;
  color?: string | undefined;
}) => {
  return (
    <RadioContainer className={cx(Flex, Align)}>
      <div
        className={cx(
          RadioBtnContainer,
          color && selectedOption === id ? className : Test
        )}>
        <Radio
          type="radio"
          name="options"
          id={id}
          onChange={handleSelectOption}
          checked={selectedOption === id}
          className={!color ? Dark : undefined}
        />
      </div>
      {id}
    </RadioContainer>
  );
};
const RadioContainer = styled.label`
  gap: 8px;
  font-size: var(--font-sizes-sm);
  line-height: 22px;
`;

const Radio = styled.input`
  position: absolute;
  width: 14px;
  height: 14px;
  &[type='radio'] {
    appearance: none;
    border-radius: 50%;
  }
  &[type='radio']:checked {
    background-color: var(--colors-main);
    border: 2px solid #fff;
  }
`;

const Dark = css`
  &[type='radio']:checked {
    background-color: var(--colors-main-dark);
    border: 2px solid #fff;
  }
`;
const Test = css`
  border: 1px solid var(--colors-btn-grey);
`;

export default RadioBtn;
