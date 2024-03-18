import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import { SEARCH_TEXTS } from '@/constants/search';
import { SearchBarProps } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { Align, Between, Flex, FlexCenter } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { SearchInput, Divider, CancelBtn } from '@/styles/styles';

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  reset,
  handleChange
}) => {
  const navigate = useNavigateTo('-1');

  return (
    <>
      <div className={cx(Align, Between)}>
        <Container className={cx(Align, Between)}>
          <Area className={Flex}>
            <IconContainer className={FlexCenter}>
              <Icon {...iconPropsGenerator('mini-search', '12')} />
            </IconContainer>
            <input
              className={SearchInput}
              type="text"
              value={search}
              onChange={handleChange}
              placeholder={SEARCH_TEXTS.placeHolder}
            />
          </Area>
          {search && (
            <IconDelete
              className={FlexCenter}
              onTouchEnd={reset}>
              <Icon {...iconPropsGenerator('input-delete', '24')} />
            </IconDelete>
          )}
        </Container>
        <Button
          className={cx(FlexCenter, CancelBtn)}
          text={SEARCH_TEXTS.moveToHome}
          onTouchEnd={navigate}
        />
      </div>

      <div className={Divider} />
    </>
  );
};

const Container = styled.div`
  width: 85%;
  margin: 7px 0;
  background-color: var(--colors-tertiary);
  border-radius: 6px;
`;
const Area = styled.div`
  height: 32px;
`;
const IconContainer = styled.div`
  padding: 10px;
`;
const IconDelete = styled.div`
  padding: 4px;
`;

export default SearchBar;
