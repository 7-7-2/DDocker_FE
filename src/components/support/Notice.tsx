import { useNavigate } from 'react-router-dom';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';
import {
  CustomerItem,
  CustomerTitle,
  CustomertDate,
  Regular
} from '@/styles/styles';

const data = [
  {
    noticeId: 'hello',
    title: 'DDoceker 서비스 오픈!',
    date: '2024-05-17'
  },
  {
    noticeId: 'helloDDocker',
    title: 'DDoceker 공유 기능 설명',
    date: '2024-05-17'
  }
];
const Notice = () => {
  const navigate = useNavigate();
  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/support/notice/${e.currentTarget.id}`);
  };
  return (
    <div className={cx(Column, Regular)}>
      {data.map(item => (
        <NoticeItem
          key={item.noticeId}
          id={item.noticeId}
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
