import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';

import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { statsNavigationState } from '@/atoms/atoms';
import { COFFEE_TEXTS } from '@/constants/coffee';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between, FlexCenter, FlexGrow } from '@/styles/layout';
import { Semibold } from '@/styles/styles';

const Navigation = ({
  activeStartDate,
  nextBtnState,
  prevBtnState,
  handleNextBtn,
  handlePrevBtn,
  isActionModal,
  handleActionModal,
  selectedTab,
  signedIn
}: {
  activeStartDate: Date;
  nextBtnState: boolean;
  prevBtnState: boolean;
  handleNextBtn: () => void;
  handlePrevBtn: () => void;
  isActionModal?: boolean | undefined;
  handleActionModal?: () => void;
  selectedTab?: string;
  signedIn?: string;
}) => {
  const currentWeek = useRecoilValue(statsNavigationState);
  const weeklyAnalysis = selectedTab === COFFEE_TEXTS.tabs[1] && !!currentWeek;

  return (
    <>
      <Container className={cx(FlexCenter, Between, Semibold)}>
        <button
          onClick={handlePrevBtn}
          disabled={!prevBtnState}>
          {signedIn && prevBtnState ? (
            <Icon {...iconPropsGenerator('calendar-active-prev', '18')} />
          ) : (
            <Icon {...iconPropsGenerator('calendar-prev', '18')} />
          )}
        </button>

        <button
          className={cx(FlexCenter, FlexGrow)}
          onClick={handleActionModal}
          disabled={weeklyAnalysis}>
          {selectedTab === COFFEE_TEXTS.tabs[1] && currentWeek ? (
            <span>{currentWeek}</span>
          ) : (
            <span>
              {isActionModal
                ? dayjs(activeStartDate).format('YYYY')
                : dayjs(activeStartDate).format('YYYY. MM')}
              {isActionModal && <span>{COFFEE_TEXTS.year}</span>}
            </span>
          )}
        </button>

        <button
          onClick={handleNextBtn}
          disabled={!nextBtnState}>
          {nextBtnState ? (
            <Icon {...iconPropsGenerator('calendar-active-next', '18')} />
          ) : (
            <Icon {...iconPropsGenerator('calendar-next', '18')} />
          )}
        </button>
      </Container>
    </>
  );
};
const Container = styled.div`
  height: 62px;
  padding: 0 20px;
  font-size: var(--font-sizes-lg);
  background-color: #fff;
  z-index: 3;
`;

export default Navigation;
