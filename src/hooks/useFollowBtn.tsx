import { useState } from 'react';

const useFollowBtn = () => {
  const [toggleFollow, setToggleFollow] = useState(false);
  return { toggleFollow, setToggleFollow };
};

export default useFollowBtn;
