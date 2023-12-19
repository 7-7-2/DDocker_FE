import Icon from '@/components/common/Icon';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { FlexCenter, MarginAuto } from '@/styles/layout';
import { Cursor } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const ProfileImg = ({ edit }: { edit: boolean }) => {
  const handleProfile = useNavigateTo('/mypage');

  return (
    <Container className={cx(FlexCenter, MarginAuto)}>
      <Box className={cx(FlexCenter, MarginAuto)}>
        <div>
          <Icon {...iconPropsGenerator('user', '100')} />
        </div>
        <Edit className={Cursor}>
          <Icon
            {...iconPropsGenerator(!edit ? 'edit' : 'edit-photo', '32')}
            onTouchEnd={handleProfile}
          />
        </Edit>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100px;
  border-radius: 100%;
`;

const Box = styled.div`
  width: 54px;
  height: 54px;
  position: relative;
`;

const Edit = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: -15px;
  right: -25px;
  z-index: 1;
`;

export default ProfileImg;
