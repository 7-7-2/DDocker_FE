import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Flex, Between } from '@/styles/layout';
import { SelectedTap, DefaultTap } from '@/styles/styles';

const Taps = ({
  taps,
  selectedTab,
  handleButtonClick
}: {
  taps: Array<string>;
  selectedTab: string;
  handleButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <TabContainer className={cx(Flex, Between)}>
      {taps.map(item => (
        <TapItem
          className={cx(selectedTab === item ? SelectedTap : DefaultTap)}
          onClick={handleButtonClick}
          value={item}
          key={item}>
          <TapTitle>{item}</TapTitle>
        </TapItem>
      ))}
    </TabContainer>
  );
};

const TabContainer = styled.div`
  height: 40px;
  margin: 0 -20px;
`;

const TapItem = styled.button`
  width: 50%;
  text-align: center;
`;

const TapTitle = styled.div`
  margin: 10px 0;
  line-height: 20px;
  font-size: var(--font-sizes-sm);
`;

export default Taps;
