import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { MarginT16, Medium } from '@/styles/styles';

const RegisterLabel = ({
  label,
  essential
}: {
  label: string;
  essential?: boolean;
}) => {
  return (
    <Continer className={cx(Flex, Medium, MarginT16)}>
      {label}
      {essential && (
        <IconContainer>
          <Icon {...iconPropsGenerator('essential', '7')} />
        </IconContainer>
      )}
    </Continer>
  );
};

const Continer = styled.div`
  font-size: var(--font-sizes-base);
  color: var(--colors-main-dark);
  line-height: 22px;
`;
const IconContainer = styled.div`
  margin: 4px 3px;
`;

export default RegisterLabel;
