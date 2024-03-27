import { styled } from 'styled-system/jsx';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { replyState } from '@/atoms/atoms';
import { Between, Flex } from '@/styles/layout';
import { Divider } from '@/styles/styles';
import { cx } from 'styled-system/css';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import Icon from '@/components/common/Icon';
import { COMMENT_TEXTS } from '@/constants/texts';
import { useRefIntoView } from '@/hooks/post/useRefIntoView';

const { at, onReply } = COMMENT_TEXTS;

const ReplyToPanel = () => {
  const selectedReply = useRecoilValue(replyState);
  const reset = useResetRecoilState(replyState);
  const { ref: panelRef } = useRefIntoView(selectedReply);

  return (
    <>
      {selectedReply && selectedReply.id !== 0 && (
        <Panel
          className={cx(Flex, Between)}
          ref={panelRef}>
          <PanelText>
            {at}
            {selectedReply.nickname}
            {onReply}
          </PanelText>
          <Icon
            {...iconPropsGenerator('reply-close', '18')}
            onTouchEnd={reset}
          />
        </Panel>
      )}
      {selectedReply && selectedReply.id === 0 && <div className={Divider} />}
    </>
  );
};

const Panel = styled.div`
  margin: 0 -20px;
  padding: 8px 20px;
  background-color: var(--colors-tertiary);
  color: var(--colors-subtext);
`;

const PanelText = styled.span`
  font-size: var(--font-sizes-xs);
  line-height: 20px;
`;

export default ReplyToPanel;
