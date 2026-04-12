import Toggle from '@/components/common/Toggle';
import { Label } from '@/components/common/Label';

import { LABEL_TEXTS } from '@/constants/common';
import { MYPAGE_TEXTS } from '@/constants/profile';

import { styled } from 'styled-system/jsx';
import { Between, Column } from '@/styles/layout';
import { Regular } from '@/styles/styles';
import { useRecoilState } from 'recoil';
import { authState } from '@/atoms/atoms';
import { useState } from 'react';

const { description } = MYPAGE_TEXTS;

const PrivateAccountToggle = () => {
  const [userInit, setUserInit] = useRecoilState(authState);
  const [isToggle, setIsToggle] = useState(!userInit?.visibility);

  const editUserInfo = () => {
    setUserInit({ ...userInit, visibility: accountVisibilty });
  };
  const accountVisibilty = !isToggle ? 0 : 1;

  const handleToggle = () => {
    setIsToggle(!isToggle);
    editUserInfo();
  };

  return (
    <Container className={Column}>
      <InterFace className={Between}>
        <Label label={LABEL_TEXTS.accountPrivate} />
        <Toggle
          toggleState={isToggle}
          onClick={handleToggle}
        />
      </InterFace>
      <Description className={Regular}>{description}</Description>
    </Container>
  );
};

const Container = styled.div`
  height: 90px;
`;
const InterFace = styled.div`
  display: flex;
  align-items: flex-start;
`;
const Description = styled.span`
  font-size: var(--font-sizes-xs);
  color: var(--colors-mid-grey);
  line-height: 17px;
  text-align: left;
  margin-top: 6px;
`;

export default PrivateAccountToggle;
