import Button from '@/components/common/Button';

import { BUTTON_TEXTS } from '@/constants/common';
import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';
import { MediumBtn, BtnColorMain, Medium } from '@/styles/styles';
import { useNavigateTo } from '@/hooks/useNavigateTo';

const AnalysisLoginCTA = () => {
  const toSignIn = useNavigateTo('/start/1');
  return (
    <BlurOverlay>
      <LoginCTASection className={Column}>
        <Description className={Medium}>
          {COFFEE_ANALYSIS_TEXTS.guestViewText}
        </Description>
        <Button
          className={cx(MediumBtn, BtnColorMain)}
          text={BUTTON_TEXTS.signIn2}
          onClick={() => toSignIn()}
        />
      </LoginCTASection>
    </BlurOverlay>
  );
};

const BlurOverlay = styled.div`
  height: calc(100dvh - 64px - 158px);
  position: absolute;
  top: 158px;
  left: 0;
  right: 0;
  overflow-y: scroll;
  pointer-events: none;
  z-index: var(--z-index-background-layer);
  background-color: rgba(255, 255, 255, 0.5);
`;

const LoginCTASection = styled.div`
  height: 240px;
  width: 100%;
  padding-bottom: 22px;
  position: fixed;
  bottom: 64px;
  justify-content: end;
  align-items: center;
  z-index: var(--z-index-action-btn);
  pointer-events: visible;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 01) 50%,
    rgba(255, 255, 255, 1) 100%
  );
`;

const Description = styled.span`
  font-size: var(--font-size-sm);
  color: var(--colors-main-dark);
  white-space: pre-wrap;
  text-align: center;
  margin-bottom: 16px;
`;

export default AnalysisLoginCTA;
