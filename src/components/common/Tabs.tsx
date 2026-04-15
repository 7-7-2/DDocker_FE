import { PROFILE_TEXTS } from '@/constants/profile';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Flex, Between } from '@/styles/layout';
import { SelectedTab, DefaultTab, DisabledTab } from '@/styles/styles';

const Tabs = ({
  tabs,
  selectedTab,
  handleButtonClick,
  disabled
}: {
  tabs: Array<string>;
  selectedTab: string;
  handleButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}) => {
  const { profileTabs } = PROFILE_TEXTS;
  const selectedTabStyle =
    disabled && tabs === profileTabs ? DisabledTab : SelectedTab;

  return (
    <TabContainer className={cx(Flex, Between)}>
      {tabs.map(item => (
        <TabItem
          disabled={disabled}
          className={cx(selectedTab === item ? selectedTabStyle : DefaultTab)}
          onClick={handleButtonClick}
          value={item}
          key={item}>
          <TabTitle>{item}</TabTitle>
        </TabItem>
      ))}
    </TabContainer>
  );
};

const TabContainer = styled.div`
  height: 40px;
  margin: 0 -20px;
`;

const TabItem = styled.button`
  width: 50%;
  text-align: center;
`;

const TabTitle = styled.div`
  margin: 10px 0;
  line-height: 20px;
  font-size: var(--font-sizes-sm);
`;

export default Tabs;
