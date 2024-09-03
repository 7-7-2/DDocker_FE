import { useParams } from 'react-router-dom';
import Icon from '@/components/common/Icon';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { FlexCenter, MarginAuto } from '@/styles/layout';
import { Cursor } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useState } from 'react';

const ProfileImg = ({ imageUrl }: { imageUrl?: string }) => {
  const [profileUrl, setProfileUrl] = useState<string>(imageUrl as string);
  const handleProfile = useNavigateTo('/mypage');
  const { userId: ProFileId } = useParams();

  const { userId } = useCachedUserInfo();
  const handleError = () => setProfileUrl('');

  return (
    <Container className={cx(FlexCenter, MarginAuto)}>
      <Box className={cx(FlexCenter, MarginAuto)}>
        <div>
          {profileUrl ? (
            <ImgRound
              src={profileUrl}
              onError={handleError}
              alt="Profile"
            />
          ) : (
            <Icon {...iconPropsGenerator('user', '100')} />
          )}
        </div>
        {ProFileId && ProFileId === userId && (
          <Edit className={Cursor}>
            <Icon
              {...iconPropsGenerator('edit', '32')}
              onClick={handleProfile}
            />
          </Edit>
        )}
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
  position: relative;
`;

const Edit = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 9px;
  right: -2px;
  z-index: 1;
`;
const ImgRound = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  overflow: hidden;
`;

export default ProfileImg;
