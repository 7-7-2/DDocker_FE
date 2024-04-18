import { useNavigate } from 'react-router-dom';

export const useNavigateTo = (to: string) => {
  const navigate = useNavigate();
  const toWhere = () => {
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
