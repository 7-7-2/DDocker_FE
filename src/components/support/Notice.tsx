import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getSupportList } from '@/api/support';
import { NoticesListData } from '@/types/types';
import { SUPPORT_TEXTS } from '@/constants/support';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';
import {
  CustomerItem,
  CustomerTitle,
  CustomertDate,
  Regular
} from '@/styles/styles';

const { type } = SUPPORT_TEXTS.customerCenter.notice;

const Notice = () => {
  const navigate = useNavigate();

  const { data: noticesList } = useQuery({
    queryKey: ['noticesList', 'notice'],
    queryFn: async () => {
      const data = await getSupportList(type);
      return data.data;
    }
  });

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/support/notice/${e.currentTarget.id}`);
  };
  return (
    <div className={cx(Column, Regular)}>
      {noticesList &&
        noticesList.map((item: NoticesListData) => (
          <NoticeItem
            key={item.postId}
            id={item.postId}
            className={cx(Column, CustomerItem)}
            onClick={handleOnClick}>
            <NoticeTitle className={CustomerTitle}>{item.title}</NoticeTitle>
            <NoticeDate className={CustomertDate}>{item.date}</NoticeDate>
          </NoticeItem>
        ))}
    </div>
  );
};

const NoticeItem = styled.div`
  min-height: 86px;
  gap: 4px;
  padding: 20px 0;
`;
const NoticeTitle = styled.span``;
const NoticeDate = styled.span``;

export default Notice;
