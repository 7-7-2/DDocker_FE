import { WeeklyPopularTypes } from '@/types/types';
import convertBrandName from '@/utils/convertBrandName';
import { styled } from 'styled-system/jsx';
import { Align } from '@/styles/layout';

const WeeklyPopularItem = ({
  data,
  idx
}: {
  data: WeeklyPopularTypes;
  idx: number;
}) => {
  const icon = `/png/${data.brand}.png`;

  return (
    <Container className={Align}>
      <span>{idx + 1}</span>
      <BrandInfo className={Align}>
        <BrandIcon
          src={icon}
          alt={data.brand}
        />
        <span>{convertBrandName(data.brand)}</span>
      </BrandInfo>
    </Container>
  );
};

const Container = styled.div`
  height: 54px;
  border-radius: 50px;
  padding: 8px 20px;
  background: #fff;
`;
const BrandInfo = styled.div`
  margin-left: 20px;
`;
const BrandIcon = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: darkkhaki;
  margin-right: 12px;
`;

export default WeeklyPopularItem;
