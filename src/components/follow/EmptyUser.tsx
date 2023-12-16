import Button from '@/components/common/Button';
import { EmptyUserProps } from '@/types/types';
import { Column, Flex, FlexCenter, Center } from '@/styles/layout';
import { ButtonArea } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const EmptyUser: React.FC<EmptyUserProps> = ({ label, onTouchEnd }) => {
  return (
    <Container className={cx(FlexCenter)}>
      <div className={cx(Column, Center)}>
        <span className={Flex}>{`아직 ${label}이(가) 없어요 😭`}</span>
        {onTouchEnd && (
          <Button
            onTouchEnd={onTouchEnd}
            className={cx(FlexCenter, ButtonArea)}
            text={'검색하기'}
          />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: auto;
  flex-direction: column;
  height: calc(100% - 40px - 18px);
`;

export default EmptyUser;
