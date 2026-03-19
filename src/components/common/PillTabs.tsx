import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { DefaultFillTab, SelectedFillTab } from '@/styles/styles';
import { Center, Flex } from '@/styles/layout';

const PillTabs = ({
  tabs,
  selectedTab,
  handleButtonClick
}: {
  tabs: Array<string>;
  selectedTab: string;
  handleButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <Container className={cx(Flex, Center)}>
      {tabs.map(name => (
        <TabItem
          className={cx(
            selectedTab === name ? SelectedFillTab : DefaultFillTab,
            Flex,
            Center
          )}
          onClick={handleButtonClick}
          value={name}
          key={name}>
          {name}
        </TabItem>
      ))}
    </Container>
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

export default PillTabs;
