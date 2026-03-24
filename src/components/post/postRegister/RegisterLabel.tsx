import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { Semibold } from '@/styles/styles';

const RegisterLabel = ({
  label,
  essential
}: {
  label: string;
  essential?: boolean;
}) => {
  return (
    <Continer className={cx(Flex, Semibold)}>
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
  line-height: 24px;
  margin-top: 18px;
`;
const IconContainer = styled.div`
  margin: 4px 3px;
`;

export default RegisterLabel;
