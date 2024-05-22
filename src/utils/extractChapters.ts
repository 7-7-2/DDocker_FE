import { ChapterContentsType, ChpaterType } from '@/types/types';

export const extractChapter = (type: string, text: string) => {
  if (type === 'TOS') {
    const contents = text
      .split('##')
      .filter(item => item !== ``)
      .map(item => item.split('**'));
    const chapters = contents.map(item => {
      const chapter: ChpaterType = {
        chapter: '',
        chapterContents: []
      };
      item.forEach((value, index) => {
        if (index === 0) {
          chapter.chapter = value;
        } else if (index % 2 === 1) {
          chapter.chapterContents.push({ title: value, content: '' });
        } else {
          chapter.chapterContents[chapter.chapterContents.length - 1].content =
            value;
        }
      });
      return chapter;
    });
    return chapters;
  }

  const contents = text.split('**').filter(item => item !== ``);
  const chapter: ChapterContentsType[] = contents.reduce(
    (acc: Array<{ title: string; content: string }>, _, index) => {
      if (index % 2 === 0) {
        acc.push({ title: contents[index], content: contents[index + 1] });
      }
      return acc;
    },
    []
  );
  return chapter;
};
