import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Center, Column } from '@/styles/layout';

const ImageErrorCTA = ({
  text,
  handleOnclick
}: {
  text: string;
  handleOnclick: (() => Promise<void>) | (() => void);
}) => {
  return (
    <Container className={cx(Column, Align, Center)}>
      <span>{text}</span>
      <button onClick={handleOnclick}>
        <Icon {...iconPropsGenerator('reload', '30')} />
      </button>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  gap: 16px;
`;

export default ImageErrorCTA;
