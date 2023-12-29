import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { HomeRegistContainer, MarginT16 } from '@/styles/styles';

const RegisterLabel = ({
  label,
  essential
}: {
  label: string;
  essential?: boolean;
}) => {
  return (
    <div className={cx(HomeRegistContainer, MarginT16, Flex)}>
      {label}
      {essential && (
        <IconContainer>
          <Icon {...iconPropsGenerator('essential', '7')} />
        </IconContainer>
      )}
    </div>
  );
};

const IconContainer = styled.div`
  margin: 4px 3px;
`;

export default RegisterLabel;
