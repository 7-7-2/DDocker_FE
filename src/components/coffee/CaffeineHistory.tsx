import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import SwipeActionContainer from '@/components/common/SwipeActionContainer';
import DailyRecordsItem from '@/components/coffee/DailyRecordsItem';
import CaffeineHistoryHeader from '@/components/coffee/CaffeineHistoryHeader';
import ModalCTA from '@/components/common/ModalCTA';

import { useDeleteCaffeine } from '@/hooks/coffee/useDeleteCaffeine';
import {
  CaffeineHistoryTypes,
  CaffeineIntakeTypes,
  CalendarData
} from '@/types/types';
import { COFFEE_HISTORY_TEXTS } from '@/constants/coffee';
import { BUTTON_TEXTS } from '@/constants/common';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Column, Flex } from '@/styles/layout';
import {
  BtnColorBorder,
  BtnColorMain,
  Medium,
  Semibold
} from '@/styles/styles';

const { filter, count, deleteModal } = COFFEE_HISTORY_TEXTS;
const CaffieneHistory = ({
  data,
  activeMonth
}: {
  data: CaffeineHistoryTypes;
  activeMonth: string;
}) => {
  const [isSelected, setIsSelected] = useState(filter[0]);

  const { isModal, isPost, handleOnSwipe, handleDeleteBtn, handleDeleteModal } =
    useDeleteCaffeine(activeMonth);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSelected(e.currentTarget.value);
  };

  const handleFilteringData = (data: CalendarData[]) => {
    if (isSelected === filter[1]) {
      const commended = data.filter(date => Number(date.caffeineSum) <= 400);
      return commended;
    }
    if (isSelected === filter[2]) {
      const excessive = data.filter(date => Number(date.caffeineSum) > 400);
      return excessive;
    } else return data;
  };

  return (
    <>
      <Container>
        <FilterContainer className={Flex}>
          {filter.map(item => (
            <FilterBtn
              key={item}
              value={item}
              onClick={handleOnClick}
              className={cx(
                isSelected === item ? BtnColorMain : BtnColorBorder,
                Medium
              )}>
              {item}
            </FilterBtn>
          ))}
        </FilterContainer>
        <HistoryList>
          <Count className={Medium}>
            <span>{count[0]}</span>
            <CountNum className={Semibold}>{data?.summary.length}</CountNum>
            <span>{count[1]}</span>
          </Count>
          {data &&
            handleFilteringData(data?.summary).map(dailyRecord => (
              <React.Fragment key={dailyRecord.day}>
                <CaffeineHistoryHeader dailyRecord={dailyRecord} />
                <DailyRecords className={Column}>
                  {data?.details[dailyRecord.day].map(
                    (recodes: CaffeineIntakeTypes) => (
                      <SwipeActionContainer
                        key={recodes.intakeId}
                        itemId={recodes.intakeId}
                        handleOnSwipe={handleOnSwipe}
                        handleOnClick={handleDeleteModal}>
                        <DailyRecordsItem recodes={recodes} />
                      </SwipeActionContainer>
                    )
                  )}
                </DailyRecords>
              </React.Fragment>
            ))}
        </HistoryList>
        <Toaster />
      </Container>
      {isModal && (
        <ModalCTA
          buttonText={[BUTTON_TEXTS.cancel, BUTTON_TEXTS.delete]}
          title={isPost ? deleteModal.title.post : deleteModal.title.intake}
          description={
            isPost
              ? deleteModal.description.post
              : deleteModal.description.intake
          }
          fn={() => handleDeleteBtn()}
        />
      )}
    </>
  );
};

const Container = styled.div`
  margin-top: 32px;
  max-width: 500px;
`;
const FilterContainer = styled.div`
  gap: 6px;
`;
const FilterBtn = styled.button`
  height: 34px;
  width: 53px;
  border-radius: 50px;
  line-height: 24px;
  font-size: var(--font-sizes-sm);
`;
const HistoryList = styled.div`
  margin-top: 24px;
`;
const Count = styled.div`
  height: 33px;
  width: 100%;
  margin-bottom: 22px;
  border-bottom: solid 1px var(--colors-border-grey);
  color: var(--colors-mid-grey);
`;
const CountNum = styled.span`
  color: var(--colors-main-dark);
`;

const DailyRecords = styled.div`
  margin: 18px 0 30px 0;
  gap: 12px;
`;

export default CaffieneHistory;
