import { Justify } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { TEXT } from '@/constants/texts';
import { Semibold } from '@/styles/styles';

const { searchMore } = TEXT;

const SearchMore = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={Justify}>
      <More
        onClick={onClick}
        className={Semibold}>
        {searchMore}
      </More>
    </div>
  );
};

const More = styled.button`
  font-size: var(--font-sizes-xs);
  color: var(--colors-mid-grey);
`;

export default SearchMore;
