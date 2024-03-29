import { TEXT } from '@/constants/texts';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { FlexCenter, Column, Flex } from '@/styles/layout';
import { ToggleButton, ToggleLeft, ToggleRight } from '@/styles/styles';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const FollowTabs = ({
  activeTab,
  username,
  handleButtonTouch
}: {
  activeTab: string;
  username: string;
  handleButtonTouch: (e: React.TouchEvent<HTMLButtonElement>) => void;
}) => {
  useComposeHeader(false, username, 'close');

  return (
    <div className={cx(FlexCenter, Column, Sticky)}>
      <ToggleArea className={Flex}>
        <button
          className={cx(
            BtnCommon,
            ToggleLeft,
            activeTab === '팔로워' && 'active'
          )}
          onTouchEnd={handleButtonTouch}
          value="팔로워">
          {TEXT.toggleFollowedBtn}
        </button>
        <button
          className={cx(
            BtnCommon,
            ToggleRight,
            activeTab === '팔로잉' && 'active'
          )}
          onTouchEnd={handleButtonTouch}
          value="팔로잉">
          {TEXT.toggleFollowingBtn}
        </button>
      </ToggleArea>
    </div>
  );
};

const ToggleArea = styled.div`
  width: 100%;
`;

const Sticky = css`
  position: sticky;
  top: 0;
  background-color: white;
`;

const BtnCommon = cx(ToggleButton, FlexCenter);

export default FollowTabs;
