import { useShowFooter } from '@/hooks/useShowFooter';

// CLOSE ICON + REGISTER BTN => useShowFooter(true) hook call required
const PostRegister = () => {
  useShowFooter(false);
  return <>PostRegister</>;
};

export default PostRegister;
