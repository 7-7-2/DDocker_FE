import { useNavigate } from 'react-router-dom';
import Icon from 'components/common/Icon';
import { styled } from 'styled-system/jsx';
import { FlexCenter, MarginAuto } from '@/styles/layout';
import { cx } from 'styled-system/css';

const ProfileImg = () => {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/MyPage');
  };

  return (
    <Container className={FlexCenter}>
      <Box className={cx(FlexCenter, MarginAuto)}>
        <User>
          <Icon
            id="icon-user"
            size="100"
          />
        </User>
        <Edit>
          <Icon
            id="icon-edit"
            size="32"
            onTouchEnd={handleProfileClick}
          />
        </Edit>
      </Box>
    </Container>
  );
};

export default ProfileImg;

const Container = styled.div`
  position: relative;
  margin: auto;
  width: 94px;
  height: 94px;
  border-radius: 9999px;
`;

const Box = styled.div`
  width: 54px;
  height: 54px;
  position: relative;
`;

const User = styled.div``;
const Edit = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: -15px;
  right: -25px;
  z-index: 1;
  cursor: pointer;
`;
