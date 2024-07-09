import convertBrandName from '@/utils/convertBrandName';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';

const SelectOption = ({
  data,
  isSelect,
  onClick: handleCilck
}: {
  data: string[];
  isSelect: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div>
      {isSelect && (
        <SelectOptionContainer className={cx(Column)}>
          <OptionCotainer>
            {data &&
              data.map(item => (
                <SelectOptionItem
                  key={item}
                  onClick={handleCilck}
                  value={item}>
                  {convertBrandName(item)}
                </SelectOptionItem>
              ))}
          </OptionCotainer>
        </SelectOptionContainer>
      )}
    </div>
  );
};

const SelectOptionContainer = styled.ul`
  position: absolute;
  left: 0;
  width: 100%;
  height: 294px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
  padding: 8px;
  margin-top: 8px;
  z-index: 1;
`;

const OptionCotainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  background-color: #fff;
  &::-webkit-scrollbar {
    display: block !important;
    background-color: transparent;
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--colors-main);
    border-radius: 20px;
  }
`;

const SelectOptionItem = styled.button`
  width: calc(100% - 8px);
  text-align: left;
  padding: 12px 16px;
  margin-right: 8px;
  border-bottom: solid 1px #edecec;
  background-color: #fff;
  &:last-child {
    margin-bottom: -8px;
    border-bottom: none;
  }
`;

export default SelectOption;
