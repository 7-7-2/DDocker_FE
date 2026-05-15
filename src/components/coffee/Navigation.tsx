import dayjs from 'dayjs';

import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { COFFEE_TEXTS } from '@/constants/coffee';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between, FlexCenter, FlexGrow } from '@/styles/layout';
import { Semibold } from '@/styles/styles';

const Navigation = ({
  activeStartDate,
  btnActiveState,
  handleNextBtn,
  handlePrevBtn,
  isActionModal,
  handleActionModal
}: {
  activeStartDate: Date;
  btnActiveState: boolean;
  handleNextBtn: () => void;
  handlePrevBtn: () => void;
  isActionModal: boolean | undefined;
  handleActionModal?: () => void;
}) => {
  return (
    <>
      <Container className={cx(FlexCenter, Between, Semibold)}>
        <button
          onClick={handlePrevBtn}
          disabled={isActionModal && !btnActiveState && true}>
          {isActionModal && !btnActiveState ? (
            <Icon {...iconPropsGenerator('calendar-prev', '18')} />
          ) : (
            <Icon {...iconPropsGenerator('calendar-active-prev', '18')} />
          )}
        </button>

        <div
          className={cx(FlexCenter, FlexGrow)}
          onClick={handleActionModal}>
          {isActionModal
            ? dayjs(activeStartDate).format('YYYY')
            : dayjs(activeStartDate).format('YYYY. MM')}
          {isActionModal && <span>{COFFEE_TEXTS.year}</span>}
        </div>

        <button
          onClick={handleNextBtn}
          disabled={btnActiveState ? false : true}>
          {btnActiveState ? (
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
