import { useParams } from 'react-router-dom';

import CustomerCenter from '@/components/support/CustomerCenter';
import NoticeDetail from '@/components/support/NoticeDetail';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { SUPPORT_TEXTS } from '@/constants/support';

const { customer, notice } = SUPPORT_TEXTS;

const Support = () => {
  const { type } = useParams();
  const { postId } = useParams();
  const customerCenter = type === customer.type;
  const noticeDetail = postId && type === notice.type;

  const headerText = () => {
    if (customerCenter) {
      return customer.title;
    }
    if (noticeDetail) {
      return notice.title;
    }
    return;
  };
  useComposeHeader(false, headerText(), 'close');

  return (
    <>
      {customerCenter && <CustomerCenter />}
      {noticeDetail && <NoticeDetail />}
    </>
  );
};

export default Support;
