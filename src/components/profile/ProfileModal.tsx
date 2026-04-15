import ActionModal from '@/components/common/ActionModal';
import Icon from '@/components/common/Icon';

import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { BUTTON_TEXTS } from '@/constants/common';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Medium } from '@/styles/styles';
import { Align, Flex } from '@/styles/layout';

const ProfileModal = ({
  handleReport,
  handleShare
}: {
  handleReport: () => void;
  handleShare: () => Promise<void>;
}) => {
  return (
    <ActionModal>
      <ActionModalItem
        className={cx(Flex, Align)}
        onClick={handleReport}>
        <Icon {...iconPropsGenerator('report')} />
        <span className={Medium}>{BUTTON_TEXTS.userReport}</span>
      </ActionModalItem>
      <ActionModalItem
        className={cx(Flex, Align)}
        onClick={handleShare}>
        <Icon {...iconPropsGenerator('share')} />
        <span className={Medium}>{BUTTON_TEXTS.profileShare}</span>
      </ActionModalItem>
    </ActionModal>
  );
};
const ActionModalItem = styled.button`
  gap: 12px;
  font-size: var(--font-sizes-base);
  line-height: 24px;
`;
export default ProfileModal;
