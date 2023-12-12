import { useNavigate } from 'react-router-dom';
import Icon from 'components/common/Icon';
import { styled } from 'styled-system/jsx';
import { FlexCenter, Center, MarginAuto } from '@/styles/layout';
import { cx } from 'styled-system/css';

const ProfileImg = () => {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/MyPage');
  };

  return (
    <Wrapper>
      <Container className={FlexCenter}>
        <Box className={cx(Center, MarginAuto)}>
          <Icon
            id="icon-user"
            size="54"
          />
        </Box>
        <Edit onTouchEnd={handleProfileClick} />
      </Container>
    </Wrapper>
  );
};

export default ProfileImg;

const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  width: 94px;
  height: 94px;
  border-radius: 9999px;
  background-color: #d9d9d9;
`;

const Box = styled.div`
  width: 54px;
  height: 54px;
`;
const Edit = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  padding: 10px;
  background-color: red;
  bottom: 10px;
  right: -2px;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
`;
