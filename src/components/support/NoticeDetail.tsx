import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';
import { CustomerItem, CustomertDate, Semibold } from '@/styles/styles';

const data = {
  noticeId: 'hello',
  title: 'DDoceker 서비스 오픈!',
  constents: `
  계절이 지나가는 하늘에는
  가을로 가득 차 있습니다.
  
  나는 아무 걱정도 없이
  가을 속의 별들을 다 헤일 듯합니다.
  
  가슴속에 하나둘 새겨지는 별을
  이제 다 못 헤는 것은
  쉬이 아침이 오는 까닭이요,
  내일 밤이 남은 까닭이요,
  아직 나의 청춘이 다하지 않은 까닭입니다.
  
  별 하나에 추억과
  별 하나에 사랑과
  별 하나에 쓸쓸함과
  별 하나에 동경과
  별 하나에 시와
  별 하나에 어머니, 어머니,
  
  어머님, 나는 별 하나에 아름다운 말 한마디씩 불러 봅니다. 소학교 때 책상을 같이 했던 아이들의 이름과, 패, 경, 옥, 이런 이국 소녀들의 이름과, 벌써 아기 어머니 된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, '프랑시스 잠[1]', '라이너 마리아 릴케[2]' 이런 시인의 이름을 불러 봅니다.
  `,
  date: '2024.05.17'
};

const NoticeDetail = () => {
  return (
    <div className={Column}>
      <TitleContainer className={cx(CustomerItem, Column)}>
        <DetailTitle className={Semibold}>{data.title}</DetailTitle>
        <DetailDate className={CustomertDate}>{data.date}</DetailDate>
      </TitleContainer>
      <DetailContents>{data.constents}</DetailContents>
    </div>
  );
};

const TitleContainer = styled.div`
  gap: 6px;
  padding: 16px 0;
`;
const DetailTitle = styled.span`
  line-height: 22px;
  font-size: var(--font-sizes-base);
`;
const DetailDate = styled.span``;
const DetailContents = styled.div`
  padding: 24px 0;
  line-height: 18px;
  white-space: pre-wrap;
  font-size: var(--font-sizes-xs);
`;

export default NoticeDetail;
