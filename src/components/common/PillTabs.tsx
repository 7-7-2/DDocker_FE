import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import {
  DefaultPillTab,
  DefaultStatsPillTab,
  Divider,
  SelectedPillTab,
  SelectedStatsPillTab,
  Semibold,
  StatsPillTabs
} from '@/styles/styles';
import { Center, Flex } from '@/styles/layout';

const PillTabs = ({
  tabs,
  selectedTab,
  handleButtonClick,
  type
}: {
  tabs: Array<string>;
  selectedTab: string;
  handleButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: string;
}) => {
  const statsTabs = type === 'stats-period';

  return (
    <>
      {!statsTabs ? (
        <Container className={cx(Flex, Center, type && SmTypeContainer)}>
          {tabs.map(name => (
            <TabItem
              className={cx(
                selectedTab === name
                  ? cx(Semibold, SelectedPillTab)
                  : DefaultPillTab,
                Flex,
                Center,
                type && SmTypeItem
              )}
              onClick={handleButtonClick}
              value={name}
              key={name}>
              {name}
            </TabItem>
          ))}
        </Container>
      ) : (
        <div className={cx(Flex, Center, StatsPillTabs)}>
          {tabs.map(name => (
            <TabItem
              className={cx(
                selectedTab === name
                  ? cx(Semibold, SelectedStatsPillTab)
                  : DefaultStatsPillTab,
                Flex,
                Center,
                type && SmTypeItem
              )}
              onClick={handleButtonClick}
              value={name}
              key={name}>
              {name}
            </TabItem>
          ))}
        </div>
      )}
    </>
  );
};

const Container = styled.div`
  height: 42px;
  width: 250px;
  background-color: var(--colors-tertiary);
  border-radius: 40px;
  margin: 20px auto 0;
`;
const TabItem = styled.button`
  height: 36px;
  width: 122px;
  border-radius: 40px;
`;
const SmTypeContainer = css`
  width: 172px;
  margin-top: -10px;
`;
const SmTypeItem = css`
  width: 83px;
`;

export default PillTabs;
