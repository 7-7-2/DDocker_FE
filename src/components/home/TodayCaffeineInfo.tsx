import TodayCaffeineText from '@/components/home/TodayCaffeineText';
import WaterPerCoffee from '@/components/home/WaterPerCoffee';

const TodayCaffeineInfo = () => {
  const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };

  const accessToken = getAccessToken();
  console.log(accessToken);

  return (
    <div>
      <TodayCaffeineText accessToken={accessToken} />
      <WaterPerCoffee accessToken={accessToken} />
    </div>
  );
};

export default TodayCaffeineInfo;
