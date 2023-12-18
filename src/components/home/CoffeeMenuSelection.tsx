import { authState } from '@/atoms/atoms';
import { BRANDLIST } from '@/constants/start';
import { useRecoilValue } from 'recoil';

const CoffeeMenuSelection = () => {
  const brandList = BRANDLIST;
  const { user } = useRecoilValue(authState);

  return (
    <div>
      <select
        name="커피 브랜드"
        id="커피 브랜드">
        <option
          value={user.brand}
          disabled
          selected
          hidden>
          {(user.brand && user.brand) || '커피 브랜드'}
        </option>
        {brandList.map(item => (
          <option value={item.brand}>{item.brand}</option>
        ))}
      </select>
      <select
        name="커피 메뉴"
        id="커피 메뉴">
        <option
          value=""
          disabled
          selected
          hidden>
          커피 메뉴
        </option>
        {brandList.map(item => (
          <option value={item.brand}>{item.brand}</option>
        ))}
      </select>
    </div>
  );
};

export default CoffeeMenuSelection;
