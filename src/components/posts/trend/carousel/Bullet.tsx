import { css } from 'styled-system/css';

const Bullet = ({
  cur,
  bulletPage,
  setCurPage
}: {
  cur: number;
  bulletPage: number;
  setCurPage: (page: number) => void;
}) => {
  const isSelected = cur === bulletPage;
  const handleSetPage = () => {
    setCurPage(bulletPage);
  };
  return (
    <>
      {
        <div
          className={isSelected ? SelectedBullet : CandidateBullet}
          onClick={handleSetPage}></div>
      }
    </>
  );
};

const SelectedBullet = css`
  background-color: var(--colors-main);
  width: 6px;
  height: 6px;
  border-radius: 50%;
`;

const CandidateBullet = css`
  background-color: var(--colors-sub-grey);
  width: 6px;
  height: 6px;
  border-radius: 50%;
`;

export default Bullet;
