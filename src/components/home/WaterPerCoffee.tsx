import Button from '@/components/common/Button';
import CoffeeIntake from '@/components/home/CoffeeIntake';
import TodayMenuItem from '@/components/home/TodayMenuItem';
import WaterIntake from '@/components/home/WaterIntake';
import { BUTTON_TEXTS } from '@/constants/common';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { Column } from '@/styles/layout';
import { LoginBtn } from '@/styles/styles';
import { testData } from '@/types/types';

const data: testData = {
  Allcaffeine: 185,
  coffee: 1,
  menu: [
    {
      icon: '',
      brand: '스타벅스',
      caffeine: 185,
      menuName: '아이스아메리카노'
    },
    {
      icon: '',
      brand: '이디야',
      caffeine: 200,
      menuName: '아이스아메리카노'
    }
  ]
};

const WaterPerCoffee = ({ accessToken }: { accessToken: string | null }) => {
  const dataList = data.menu;
  const anonymousCard = (
    <div>
      <span>
        원활한 서비스 이용을 위해 <br /> 로그인을 해주세요.
      </span>
      <Button
        text={BUTTON_TEXTS.signin}
        onTouchEnd={useNavigateTo('/Start/1')}
        className={LoginBtn}
      />
    </div>
  );
  const notConsumedCoffee = (
    <div className={Column}>
      <span>오늘 아직 드신 커피가 없어요!</span>
      <Button
        text="커피등록하기+"
        onTouchEnd={() => {
          console.log('등록');
        }}
        className={LoginBtn}
      />
    </div>
  );

  const consumedCoffee = (
    <div>
      <div>
        <CoffeeIntake data={data} />
        <WaterIntake />
      </div>
      {dataList.map(item => (
        <TodayMenuItem data={item} />
      ))}
    </div>
  );

  return (
    <div>
      {!accessToken && anonymousCard}
      {!data.coffee && notConsumedCoffee}
      {data.coffee && consumedCoffee}
    </div>
  );
};

export default WaterPerCoffee;
