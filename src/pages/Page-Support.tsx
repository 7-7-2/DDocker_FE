import { useParams } from 'react-router-dom';

import CustomerCenter from '@/components/support/CustomerCenter';
import NoticeDetail from '@/components/support/NoticeDetail';
import TOS from '@/components/support/TOS';
import PrivacyPolicy from '@/components/support/PrivacyPolicy';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { SUPPORT_TEXTS } from '@/constants/support';

const { customerCenter, termsOfService, privacyPolicy } = SUPPORT_TEXTS;

const Support = () => {
  const { type } = useParams();
  const { postId } = useParams();
  const customer = type === customerCenter.type;
  const notice = postId && type === customerCenter.notice.type;
  const tos = type === termsOfService.type;
  const privacy = type === privacyPolicy.type;

  const headerText = () => {
    if (customer) {
      return customerCenter.title;
    }
    if (notice) {
      return customerCenter.notice.title;
    }
    if (tos) {
      return termsOfService.title;
    }
    if (privacy) {
      return privacyPolicy.title;
    }
    return;
  };
  useComposeHeader(false, headerText(), 'close');

  return (
    <>
      {customer && <CustomerCenter />}
      {notice && <NoticeDetail />}
      {tos && <TOS />}
      {privacy && <PrivacyPolicy />}
    </>
  );
};

export default Support;