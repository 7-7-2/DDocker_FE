import ActionButtons from '@/components/support/ActionButtons';
import { SUPPORT_TEXTS } from '@/constants/support';
import { usePrintContents } from '@/hooks/support/usePrintContents';
import { extractChapter } from '@/utils/extractChapters';
import { ChpaterType } from '@/types/types';
import { TOS_TEXT } from '@/constants/tos';
import {
  CustomerContents,
  SupportChpater,
  SupportContent,
  SupportContentTitle,
  SupportContentsContainer
} from '@/styles/styles';

const { type } = SUPPORT_TEXTS.termsOfService;

const TOS = () => {
  const { printRef, handlePrint } = usePrintContents();
  const chapters = extractChapter(type, TOS_TEXT[1]) as ChpaterType[];

  return (
    <div>
      <div
        ref={printRef}
        className={SupportContentsContainer}>
        {chapters.map(item => (
          <div>
            <span className={SupportChpater}>{item.chapter}</span>
            {item.chapterContents.map(chapterContent => (
              <div className={CustomerContents}>
                <span className={SupportContentTitle}>
                  {chapterContent.title}
                </span>
                <span className={SupportContent}>{chapterContent.content}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <ActionButtons
        type={type}
        handleOnClick={handlePrint}
      />
    </div>
  );
};

export default TOS;
