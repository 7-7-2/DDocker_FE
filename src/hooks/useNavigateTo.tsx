import { useNavigate } from 'react-router-dom';

export const useNavigateTo = (to: string) => {
  const navigate = useNavigate();
  const toWhere = () => {
    navigate(to);
  };

  return toWhere;
};
