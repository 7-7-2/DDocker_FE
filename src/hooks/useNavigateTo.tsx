import { useNavigate } from 'react-router-dom';

export const useNavigateTo = (to: string) => {
  const navigate = useNavigate();
  const toWhere = () => {
    if (to === '-1') {
      navigate(-1);
      return;
    }
    navigate(to);
  };

  return toWhere;
};
