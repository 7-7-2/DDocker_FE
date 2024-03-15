import { Column } from '@/styles/layout';
import { css } from 'styled-system/css';
import { TABS_TEXTS } from '@/constants/texts';

const PostsTab = ({
  tab,
  onClick,
  postsTab
}: {
  tab: string;
  onClick: () => void;
  postsTab: string;
}) => {
  const highlight = TABS_TEXTS[postsTab][1] === tab;

  return (
    <div className={Column}>
      <div
        onClick={onClick}
        className={highlight ? HighLightText : TabText}>
        {tab}
      </div>
      <div className={highlight ? Highlight : Tab} />
    </div>
  );
};

const Highlight = css`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    border-top: 2px solid var(--colors-main);
    top: 8px;
    z-index: 77;
    width: calc(100% - 20px);
  }
`;

const HighLightText = css`
  color: var(--colors-main);
  font-weight: 600;
  padding-right: 20px;
`;

const Tab = css``;
const TabText = css`
  color: var(--colors-subtext);
  font-weight: 600;
  padding-right: 20px;
`;

export default PostsTab;
