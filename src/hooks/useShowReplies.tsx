import { useState } from 'react';

export const useShowReplies = () => {
  const [replies, setReplies] = useState(false);
  const handleShowReplies = () => setReplies(!replies);

  return { replies, setReplies, handleShowReplies };
};
