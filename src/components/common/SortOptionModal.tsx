import React from 'react';
import ActionModal from '@/components/common/ActionModal';
import { Option } from '@/components/post/overlay/Option';

const SortOptionModal = ({
  option,
  isSelected,
  handleSortOption,
  selectSortOption
}: {
  option: string[];
  isSelected: string;
  handleSortOption: () => void;
  selectSortOption: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <ActionModal handleActionModal={handleSortOption}>
      <Option
        option={option[0]}
        onClick={selectSortOption}
        icon={isSelected === option[0] ? 'check-option' : undefined}
        type={isSelected === option[0] ? 'left' : undefined}
      />
      <Option
        option={option[1]}
        onClick={selectSortOption}
        icon={isSelected === option[1] ? 'check-option' : undefined}
        type={isSelected === option[1] ? 'left' : undefined}
      />
    </ActionModal>
  );
};

export default SortOptionModal;
