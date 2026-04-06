import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { Semibold } from '@/styles/styles';

const RegisterLabel = ({ label }: { label: string }) => {
  return <Continer className={cx(Flex, Semibold)}>{label}</Continer>;
};

const Continer = styled.div`
  font-size: var(--font-sizes-base);
  color: var(--colors-main-dark);
  line-height: 24px;
`;

export default RegisterLabel;
