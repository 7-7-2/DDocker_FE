import { useIsMutating } from '@tanstack/react-query';

import PillTabs from '@/components/common/PillTabs';
import PostRegisterForm from '@/components/post/postRegister/PostRegisterForm';
import FavoriteMenuTab from '@/components/post/postRegister/FavoriteMenuTab';

import { useShowFooter } from '@/hooks/useShowFooter';
import { useSelectTab } from '@/hooks/useSelectTab';
import { useUpadatePost } from '@/hooks/post/useUpadatePost';
import { FILL_TABS_TEXTS } from '@/constants/common';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Spinner } from '@/styles/styles';
import { Align, Center } from '@/styles/layout';

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
  const isPending = useIsMutating({ mutationKey: ['postRegister'] });
  const { selectedTab, handleSelectTab, backInitialTab } = useSelectTab(
    register[0]
  );

  return (
    <>
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
