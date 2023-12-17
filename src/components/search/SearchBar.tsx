import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import SearchListItem from '@/components/search/SearchListItem';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { Between, Flex, FlexCenter } from '@/styles/layout';
import { SearchInput } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const SearchBar = () => {
  const handleHome = useNavigateTo('/');
  return (
    <>
      <div className={cx(Flex, Between)}>
        <Container className={Flex}>
          <Area className={Flex}>
            <IconContainer className={FlexCenter}>
              <Icon {...iconPropsGenerator('search', '24')} />
            </IconContainer>
            <input
              className={SearchInput}
              type="text"
              placeholder="검색어를 입력해주세요."
            />
          </Area>
        </Container>
        <Button
          className={FlexCenter}
          text="취소"
          onTouchEnd={handleHome}
        />
      </div>
      <Border />
      <SearchListItem />
    </>
  );
};

const Container = styled.div`
  width: 85%;
  gap: 20px;
  padding: 5px 0px;
  margin: 7px 0;
  background-color: var(--colors-tertiary);
`;
const Area = styled.div`
  height: 32px;
  border-radius: 6px;
`;
const IconContainer = styled.div`
  padding: 10px;
`;
const Border = styled.div`
  border-bottom: 1px solid #edecec;
`;
export default SearchBar;
