import ActionButtons from '@/components/support/ActionButtons';
import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';
import { PRIVACY_POLICY } from '@/constants/privacyPolicy';
import { SUPPORT_TEXTS } from '@/constants/support';
import { usePrintContents } from '@/hooks/support/usePrintContents';
import { ChapterContentsType } from '@/types/types';
import { extractChapter } from '@/utils/extractChapters';
import {
  CustomerContents,
  SupportContent,
  SupportContentTitle,
  SupportContentsContainer
} from '@/styles/styles';

const { type } = SUPPORT_TEXTS.privacyPolicy;

const PrivacyPolicy = () => {
  const { printRef, handlePrint } = usePrintContents();
  const chapters = extractChapter(
    type,
    PRIVACY_POLICY[1]
  ) as ChapterContentsType[];

  return (
    <>
      <SEOMeta pageData={SEO_DATA.supportPrivacyPolicy} />
      <div
        ref={printRef}
        className={SupportContentsContainer}>
        {chapters.map(chapter => (
          <div
            key={chapter.title}
            className={CustomerContents}>
            <span className={SupportContentTitle}>{chapter.title}</span>
            <span className={SupportContent}>{chapter.content}</span>
          </div>
        ))}
      </div>
      <ActionButtons
        type={type}
        handleOnClick={handlePrint}
      />
    </>
  );
};

export default PrivacyPolicy;
