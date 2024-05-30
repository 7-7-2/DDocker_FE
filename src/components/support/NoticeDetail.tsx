import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useHTMLParser } from '@/hooks/support/useHTMLPaser';
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

  const htmlString =
    noticeDetail?.content && useHTMLParser(noticeDetail?.content);

  const pageData = {
    ...SEO_DATA.supportNotice,
    pageUrl: `${SEO_DATA.supportNotice.pageUrl}/${postId}`
  };

  return (
    <>
      <SEOMeta pageData={pageData} />
      <div className={Column}>
        <TitleContainer className={cx(CustomerItem, Column)}>
          <DetailTitle className={Semibold}>{noticeDetail?.title}</DetailTitle>
          <DetailDate className={CustomertDate}>
            {noticeDetail?.date}
          </DetailDate>
        </TitleContainer>
        <DetailContents>
          <div dangerouslySetInnerHTML={{ __html: htmlString ?? '' }} />
        </DetailContents>
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
  & h3 {
    font-size: var(--font-sizes-sm);
    color: var(--colors-main);
    margin-bottom: -10px;
  }
  & li {
    line-height: 14px;
    margin: 5px 0 -10px;
  }
`;

export default NoticeDetail;
