import { useState } from 'react';

export const useActionModal = () => {
  const [isActionModal, setIsActionModal] = useState<boolean>();
  const handleActionModal = () => setIsActionModal(!isActionModal);
  return { isActionModal, setIsActionModal, handleActionModal };
};
