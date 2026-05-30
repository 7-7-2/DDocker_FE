import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useSearchInput } from '@/hooks/search/useSearchInput';

import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { SearchBarProps } from '@/types/types';
import { SEARCH_TEXTS } from '@/constants/search';

import { styled } from 'styled-system/jsx';
import { css, cx } from 'styled-system/css';
import { Align, Between, Flex, FlexCenter } from '@/styles/layout';
import { SearchInput, CancelBtn } from '@/styles/styles';

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  reset,
  handleChange,
  type,
  placeholder
}) => {
  const navigate = useNavigateTo('-1');
  const { searchRef } = useSearchInput();

  return (
    <BackGround className={cx(type === 'brand' && brandSearchBar)}>
      <div className={cx(Align, Between)}>
        <SearchBox className={cx(Align, Between, Flex)}>
          <IconContainer className={FlexCenter}>
            <Icon {...iconPropsGenerator('mini-search', '20')} />
          </IconContainer>
          <input
            className={SearchInput}
            type="text"
            value={search}
            onChange={handleChange}
            ref={searchRef}
            placeholder={!type ? SEARCH_TEXTS.placeHolder : placeholder}
          />
          {search && (
            <div
              className={FlexCenter}
              onClick={reset}>
              <Icon {...iconPropsGenerator('input-delete', '24')} />
            </div>
          )}
        </SearchBox>
        {!type && (
          <div className={CancelBtnSpace}>
            <Button
              className={cx(FlexCenter, CancelBtn)}
              text={SEARCH_TEXTS.moveToHome}
              onClick={navigate}
            />
          </div>
        )}
      </div>
    </BackGround>
  );
};

const BackGround = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  padding: 0 20px;
  background-color: #fff;
`;

const SearchBox = styled.div`
  flex-grow: 1;
  height: 40px;
  margin: 8px 0;
  padding-right: 6px;
  background-color: var(--colors-tertiary);
  border-radius: 6px;
`;
const IconContainer = styled.div`
  padding: 10px;
`;

const CancelBtnSpace = css`
  min-width: 25px;
  margin-left: 17px;
`;

const brandSearchBar = css`
  position: relative !important;
  margin: 0 -20px;
`;

export default SearchBar;
