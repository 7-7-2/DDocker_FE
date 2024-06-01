import { Suspense, lazy } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '@/components/search/SearchBar';
import { getSupportList } from '@/api/support';
import { useSearchInput } from '@/hooks/search/useSearchInput';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { FAQData } from '@/types/types';
import { CUSTOMER_SUPPORT_TEXTS, SUPPORT_TEXTS } from '@/constants/support';

import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';
import { Semibold } from '@/styles/styles';

const FoldableCard = lazy(() => import('@/components/support/FoldableCard'));
const { FAQ: text } = CUSTOMER_SUPPORT_TEXTS;
const { type } = SUPPORT_TEXTS.customerCenter.FAQ;

const FAQ = () => {
  const { userData } = useCachedUserInfo();
  const { search, handleChange, reset } = useSearchInput();

  const { data: FAQList } = useQuery({
    queryKey: ['FAQList'],
    queryFn: async () => {
      const data = await getSupportList(type);
      return data ? data.data : [];
    }
  });

  return (
    <Continer className={Column}>
      <Message className={Semibold}>
        {userData ? userData?.nickname : text.nonMember}
        {text.message}
      </Message>
      <SearchBar
        search={search}
        handleChange={handleChange}
        reset={reset}
        type={type}
        placeholder={text.placeholder}
      />
      {FAQList &&
        FAQList.filter((item: FAQData) =>
          search ? item.title.includes(search) : item
        ).map((item: FAQData) => (
          <Suspense>
            <FoldableCard
              key={item.postId}
              data={item}
            />
          </Suspense>
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
