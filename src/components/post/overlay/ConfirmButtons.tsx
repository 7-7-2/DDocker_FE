import Button from '@/components/common/Button';
import { FlexCenter } from '@/styles/layout';
import { css, cx } from 'styled-system/css';
import { TEXT } from '@/constants/texts';

const { cancelBtn, deleteBtn } = TEXT;

const ConfirmButtons = ({
  cancelConfirm,
  handleDelete
}: {
  cancelConfirm: <T extends HTMLElement>(
    e: React.MouseEvent<T, MouseEvent>
  ) => void;
  handleDelete: () => void;
}) => {
  return (
    <div className={cx(FlexCenter, Container)}>
      <Button
        className={cx(Cancel, BtnCommon)}
        text={cancelBtn}
        onClick={cancelConfirm}
      />
      <Button
        className={cx(Confirm, BtnCommon)}
        text={deleteBtn}
        onClick={handleDelete}
      />
    </div>
  );
};
const Container = css`
  gap: 8px;
  margin-right: 20px;
`;

const BtnCommon = css`
  border-radius: var(--font-sizes-xxs);
  padding: 12px 0;
  width: 100%;
  font-weight: 500;
`;

const Cancel = css`
  color: var(--colors-mid-grey);
  border: 1px solid var(--colors-btn-grey);
`;
const Confirm = css`
  background-color: var(--colors-main);
  color: white;
`;

export default ConfirmButtons;
