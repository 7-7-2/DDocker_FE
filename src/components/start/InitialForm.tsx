import { useRecoilValue, useRecoilState } from 'recoil';
import { authState, imageState } from '@/atoms/atoms';
import Button from '@/components/common/Button';
import EditProfileImg from '@/components/mypage/EditProfileImg';
import SelectGender from '@/components/start/SelectGender';
import CheckNickname from '@/components/start/CheckNickname';
import { INITIAL_FORM_TEXTS } from '@/constants/start';
import { BUTTON_TEXTS } from '@/constants/common';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';
import {
  DefaultBtn,
  DisabledBtn,
  Regular,
  Semibold,
  StartPageContainer
} from '@/styles/styles';
import { cx } from 'styled-system/css';

const { message } = INITIAL_FORM_TEXTS;

const InitialForm = () => {
  useComposeHeader(false, '기본정보', 'close');
  const { user } = useRecoilValue(authState);
  const [imageUrl, setImageUrl] = useRecoilState(imageState);

  const handleImageSelect = (selectedImage: File) => {
    setImageUrl(URL.createObjectURL(selectedImage));
  };

  return (
    <div className={Column}>
      <div className={StartPageContainer}>
        <InitialFormText className={Regular}>
          {message.first}
          <br />
          <span className={Semibold}>{message.profile}</span>
          {message.second}
        </InitialFormText>
        <ProfileContainer>
          <EditProfileImg onImageSelect={handleImageSelect} />
        </ProfileContainer>
        <CheckNickname />
        <SelectGender />
      </div>

      <Button
        text={BUTTON_TEXTS.next}
        onTouchEnd={
          user.nickname && user?.nickname?.length >= 0 && user?.gender
            ? useNavigateTo('/start/3')
            : useNavigateTo('/start/2')
        }
        className={
          user?.nickname && user?.gender
            ? DefaultBtn
            : cx(DefaultBtn, DisabledBtn)
        }
      />
    </div>
  );
};

const InitialFormText = styled.div`
  margin-top: 28px;
  color: #313131;
  font-size: var(--font-sizes-xxl);
  line-height: 32px;
`;

const ProfileContainer = styled.div`
  margin: 50px 36px;
`;

export default InitialForm;
