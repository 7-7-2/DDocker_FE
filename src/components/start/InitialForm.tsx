import { useRecoilValue } from 'recoil';
import { authState } from '@/atoms/atoms';
import Button from '@/components/common/Button';
import EditProfileImg from '@/components/mypage/EditProfileImg';
import SelectGender from '@/components/start/SelectGender';
import CheckNickname from '@/components/start/CheckNickname';
import { INITIAL_FORM_TEXTS } from '@/constants/start';
import { BUTTON_TEXTS } from '@/constants/common';
import { useImgSubmit } from '@/hooks/useImgSubmit';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';
import {
  DefaultBtn,
  DisabledBtn,
  Regular,
  Semibold,
  StartPageContainer,
  PrfileTitle,
  MarginT28
} from '@/styles/styles';
import { cx } from 'styled-system/css';

const { message } = INITIAL_FORM_TEXTS;

const InitialForm = () => {
  useComposeHeader(false, '기본정보', 'close');
  const { user } = useRecoilValue(authState);
  const { setImageUrl } = useImgSubmit();
  const handleImageSelect = (selectedImage: File) => {
    setImageUrl(URL.createObjectURL(selectedImage));
  };
  return (
    <div className={Column}>
      <div className={StartPageContainer}>
        <div className={cx(Regular, PrfileTitle, MarginT28)}>
          {message.first}
          <br />
          <span className={Semibold}>{message.profile}</span>
          {message.second}
        </div>
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

const ProfileContainer = styled.div`
  margin: 50px 36px;
`;

export default InitialForm;
