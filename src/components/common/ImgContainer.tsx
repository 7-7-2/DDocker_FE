import { css } from 'styled-system/css';

const ImgContainer = ({
  url,
  comment = false
}: {
  url: string;
  comment?: boolean;
}) => {
  return (
    <img
      className={comment ? CommentSize : Container}
      src={url}
    />
  );
};

const Container = css`
  min-width: 44px;
  height: 44px;
  border-radius: 50%;
`;
const CommentSize = css`
  min-width: 36px;
  height: 36px;
  border-radius: 50%;
`;

export default ImgContainer;
