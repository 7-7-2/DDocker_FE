import Button from '@/components/common/Button';
import CaffeineInfo from '@/components/home/CaffeineInfo';
import CoffeeSelection from '@/components/home/CoffeeSelection';
import { BUTTON_TEXTS } from '@/constants/common';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { styled } from 'styled-system/jsx';
import { RegistBtn } from '@/styles/styles';
import { useQuery } from '@tanstack/react-query';
import useGetCacheData from '@/hooks/useGetCacheData';

const CaffeineFilter = () => {
  const registPage = useNavigateTo('/post/register');
  const { data: signedIn } = useQuery({
    queryKey: ['signedIn'],
    queryFn: () => useGetCacheData('user', '/accessToken')
  });

  return (
    <Container>
      <CoffeeSelection />
      <CaffeineInfo />
      {signedIn && (
        <Button
          text={BUTTON_TEXTS.regist}
          onTouchEnd={registPage}
          className={RegistBtn}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 32px 0 32px;
`;

export default CaffeineFilter;
