import { useLocation, useNavigate } from 'react-router-dom';
export const useNavigateTo = (to: string) => {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const registered = pathname.includes('post') && state;
  const toWhere = () => {
    if (registered && to === '-1') {
      return navigate('/');
    }
    if (to === '-1') {
      navigate(-1);
      return;
    }
    if (to === '0') {
      navigate(0);
      return;
    }

    navigate(to);
  };

  return toWhere;
};
