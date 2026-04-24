import { styled } from 'styled-system/jsx';
import { COMMENT_TEXTS } from '@/constants/texts';

const { hide, loadMore } = COMMENT_TEXTS;

const CheckReply = ({
  count,
  replies,
  handleShowReplies
}: {
  count: number;
  replies: boolean;
  handleShowReplies: () => void;
}) => {
  return (
    <>
      {Number(count) > 0 && !replies && (
        <Container>
          <ToggleReply
            onClick={handleShowReplies}>{`${count}${loadMore}`}</ToggleReply>
        </Container>
      )}
      {Number(count) > 0 && replies && (
        <Container>
          <ToggleReply onClick={handleShowReplies}>{hide}</ToggleReply>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  padding-left: 44px;
  padding-bottom: 20px;
  color: var(--colors-mid-grey);
  font-weight: 600;
  line-height: 14px;
  font-size: var(--font-sizes-xs);
`;

const ToggleReply = styled.span``;

export default CheckReply;
