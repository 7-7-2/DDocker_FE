import { useQuery } from '@tanstack/react-query';
import Button from '@/components/common/Button';
import CaffeineInfo from '@/components/home/CaffeineInfo';
import CoffeeSelection from '@/components/home/CoffeeSelection';
import { BUTTON_TEXTS } from '@/constants/common';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import useGetCacheData from '@/hooks/useGetCacheData';
import { styled } from 'styled-system/jsx';
import { RegistBtn } from '@/styles/styles';
import { css, cx } from 'styled-system/css';

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
          className={cx(RegistBtn, MarginBottom)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 32px 0 0;
`;
const MarginBottom = css`
  margin-bottom: 32px;
`;

export default CaffeineFilter;
