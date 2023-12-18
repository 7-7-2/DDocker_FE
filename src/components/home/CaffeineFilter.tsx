import CaffeineInfo from '@/components/common/CaffeineInfo';
import Button from '@/components/common/Button';
import CoffeeSelection from '@/components/home/CoffeeSelection';
import { BUTTON_TEXTS } from '@/constants/common';
import { RegistBtn } from '@/styles/styles';

const CaffeineFilter = () => {
  return (
    <div>
      <CoffeeSelection />
      <CaffeineInfo />
      <Button
        text={BUTTON_TEXTS.regist}
        onTouchEnd={() => {
          console.log('hi');
        }}
        className={RegistBtn}
      />
    </div>
  );
};

export default CaffeineFilter;
