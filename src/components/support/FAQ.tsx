import SearchBar from '@/components/search/SearchBar';
import { useSearchInput } from '@/hooks/search/useSearchInput';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { CUSTOMER_SUPPORT_TEXTS, SUPPORT_TEXTS } from '@/constants/support';

import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';
import { Semibold } from '@/styles/styles';
import FoldableCard from '@/components/support/FoldableCard';

const { FAQ: text } = CUSTOMER_SUPPORT_TEXTS;
const { type } = SUPPORT_TEXTS.FAQ;
const data = [
  {
    postId: 'helldddo',
    title: '대화를 백업하려면 어떻게 해야 하나요?',
    contents: `그게 말이죠 어쩌고 저쩌고 이러쿵해서 불가능합니다.
이렇게 이렇게 요롷게 죠롷게 하세요.
그게 말이죠 어쩌고 저쩌고 이러쿵해서 불가능합니다.
이렇게 이렇게 요롷게 죠롷게 하세요.
그게 말이죠 어쩌고 저쩌고 이러쿵해서 불가능합니다.
이렇게 이렇게 요롷게 죠롷게 하세요.`
  },
  {
    postId: 'helloddd',
    title: '똑플루언서가 되려면 어떻게 해야 하나여?',
    contents: `그게 말이죠 어쩌고 저쩌고 이러쿵해서 불가능합니다.
이렇게 이렇게 요롷게 죠롷게 하세요.`
  }
];
const FAQ = () => {
  const { userData } = useCachedUserInfo();
  const { search, handleChange, reset } = useSearchInput();

  return (
    <Continer className={Column}>
      <Message className={Semibold}>
        {userData.nickname}
        {text.message}
      </Message>
      <SearchBar
        search={search}
        handleChange={handleChange}
        reset={reset}
        type={type}
        placeholder={text.placeholder}
      />
      {data.map(item => (
        <FoldableCard data={item} />
      ))}
    </Continer>
  );
};

const Continer = styled.div`
  color: var(--colors-main-dark);
`;
const Message = styled.span`
  margin: 28px 0 16px;
  white-space: pre-wrap;
  line-height: 28px;
  font-size: var(--font-sizes-xl);
`;
export default FAQ;
