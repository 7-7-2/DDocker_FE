import dayjs from 'dayjs';

import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between, FlexCenter, FlexGrow } from '@/styles/layout';
import { Semibold } from '@/styles/styles';

const MonthNavigaition = ({
  activeStartDate,
  nextBtnState,
  handleNextBtn,
  handlePrevBtn
}: {
  activeStartDate: Date;
  nextBtnState: boolean;
  handleNextBtn: () => void;
  handlePrevBtn: () => void;
}) => {
  return (
    <>
      <Navigation className={cx(FlexCenter, Between, Semibold)}>
        <button onClick={handlePrevBtn}>
          {<Icon {...iconPropsGenerator('calendar-prev', '18')} />}
        </button>
        <div className={cx(FlexCenter, FlexGrow)}>
          {dayjs(activeStartDate).format('YYYY. MM')}
        </div>
        <button onClick={handleNextBtn}>
          {nextBtnState ? (
            <Icon {...iconPropsGenerator('calendar-active-next', '18')} />
          ) : (
            <Icon {...iconPropsGenerator('calendar-next', '18')} />
          )}
        </button>
      </Navigation>{' '}
    </>
  );
};
const Navigation = styled.div`
  height: 62px;
  padding: 0 20px;
  font-size: var(--font-sizes-lg);
  background-color: #fff;
  z-index: 3;
`;

export default MonthNavigaition;
