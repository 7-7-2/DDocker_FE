import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getNoticeDetail } from '@/api/support';
import { NoticeDetailData } from '@/types/types';
import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';
import { CustomerItem, CustomertDate, Semibold } from '@/styles/styles';

const NoticeDetail = () => {
  const { postId } = useParams();

  const { data: noticeDetail } = useQuery({
    queryKey: ['noticeDetail', postId],
    queryFn: async () => {
      const data = postId && (await getNoticeDetail(postId));
      return data.data as NoticeDetailData;
    }
  });

  return (
    <>
      <SEOMeta pageData={SEO_DATA.supportNotice} />
      <div className={Column}>
        <TitleContainer className={cx(CustomerItem, Column)}>
          <DetailTitle className={Semibold}>{noticeDetail?.title}</DetailTitle>
          <DetailDate className={CustomertDate}>
            {noticeDetail?.date}
          </DetailDate>
        </TitleContainer>
        <DetailContents>{noticeDetail?.content}</DetailContents>
      </div>
    </>
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
