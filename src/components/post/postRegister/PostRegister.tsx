import { lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMutating } from '@tanstack/react-query';

import PillTabs from '@/components/common/PillTabs';
import PostRegisterForm from '@/components/post/postRegister/PostRegisterForm';
import FavoriteMenuTab from '@/components/post/postRegister/FavoriteMenuTab';

import {
  BUTTON_TEXTS,
  FILL_TABS_TEXTS,
  MODAL_CTA_TEXTS
} from '@/constants/common';

import { useShowFooter } from '@/hooks/useShowFooter';
import { useUpadatePost } from '@/hooks/post/useUpadatePost';
import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { useSelectTab } from '@/hooks/useSelectTab';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Spinner } from '@/styles/styles';
import { Align, Center } from '@/styles/layout';

const ModalCTA = lazy(() => import('@/components/common/ModalCTA'));

const { signIn2 } = BUTTON_TEXTS;
const { signIn } = MODAL_CTA_TEXTS;
const { register } = FILL_TABS_TEXTS;

const PostRegister = ({
  update,
  postid
}: {
  update?: boolean;
  postid?: string;
}) => {
  useShowFooter(false);
  useUpadatePost(update, postid);
  const { isModal } = useVerifyModalCTA();
  const navigate = useNavigate();
  const isPending = useIsMutating({ mutationKey: ['postRegister'] });
  const { selectedTab, handleSelectTab, backInitialTab } = useSelectTab(
    register[0]
  );

  //비회원,미로그인
  const handleActions: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/start/1');
  };

  return (
    <>
      {isModal && (
        <ModalCTA
          actionText={signIn2}
          text={signIn.register}
          fn={handleActions}
          type={'register'}
        />
      )}
      {!!isPending && (
        <LoadingPage className={cx(Align)}>
          <div className={cx(Spinner, Center)} />
        </LoadingPage>
      )}
      {!update && (
        <PillTabs
          tabs={register}
          selectedTab={selectedTab}
          handleButtonClick={handleSelectTab}
        />
      )}
      {selectedTab === register[0] ? (
        <PostRegisterForm update={update} />
      ) : (
        <FavoriteMenuTab backInitialTab={backInitialTab} />
      )}
    </>
  );
};

const LoadingPage = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.724);
`;

export default PostRegister;
