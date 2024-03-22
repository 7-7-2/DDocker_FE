import { styled } from 'styled-system/jsx';
import pathMap from '@/utils/getBrandPath';
import { Align, Column, FlexCenter, Justify } from '@/styles/layout';
import { css, cx } from 'styled-system/css';

const BrandCard = ({
  brand,
  setSelected,
  selected
}: {
  brand: string;
  setSelected: (brand: string) => void;
  selected: string;
}) => {
  const isSelected = brand === selected;
  return (
    <div className={cx(Column, Align)}>
      <ImgBox
        className={
          isSelected ? cx(FlexCenter, Selected) : cx(FlexCenter, Candidate)
        }>
        <Img
          src={pathMap(brand)}
          onClick={() => {
            setSelected(brand);
          }}
        />
      </ImgBox>
      <span
        className={
          isSelected
            ? cx(TextCommon, SelectedText)
            : cx(TextCommon, CandidateText)
        }>
        {brand}
      </span>
    </div>
  );
};

const Img = styled.img`
  width: 35px;
  height: 35px;
`;
const ImgBox = styled.div`
  border-radius: 16px;
  width: 60px;
  height: 60px;
  margin-bottom: 6px;
`;

const Selected = css`
  border: 2px solid var(--colors-main);
  background-color: rgba(255, 112, 30, 0.15);
`;
const Candidate = css`
  border: 1px solid var(--colors-border-grey);
`;

const TextCommon = css`
  font-size: var(--font-sizes-xs);
  line-height: var(--font-sizes-lg);
  font-weight: 500;
`;

const SelectedText = css`
  color: var(--colors-main);
`;
const CandidateText = css`
  color: var(--colors-main-dark);
`;

export default BrandCard;
