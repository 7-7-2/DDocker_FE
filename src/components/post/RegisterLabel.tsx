import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { Medium } from '@/styles/styles';

const RegisterLabel = ({
  label,
  essential
}: {
  label: string;
  essential?: boolean;
}) => {
  return (
    <RegisterLabelContiner className={cx(Medium, Flex)}>
      {label}
      {essential && (
        <IconContainer>
          <Icon {...iconPropsGenerator('essential', '7')} />
        </IconContainer>
      )}
    </RegisterLabelContiner>
  );
};

const RegisterLabelContiner = styled.div`
  margin-top: 16px;
  font-size: var(--font-sizes-base);
`;

const IconContainer = styled.div`
  margin: 4px 3px;
`;

export default RegisterLabel;
