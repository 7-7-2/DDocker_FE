import { useRecoilValue } from 'recoil';
import { authState } from '@/atoms/atoms';
import { BrnadItemProps } from '@/types/types';
import useSetUserInitialInfo from '@/hooks/useSetUserInitialInfo';
import { styled } from 'styled-system/jsx';
import { css, cx } from 'styled-system/css';
import { Center, Column } from '@/styles/layout';
import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

const BrandItem = (brandInfo: BrnadItemProps) => {
  const { user } = useRecoilValue(authState);
  const setFavBrand = useSetUserInitialInfo();
  const selectBrand: React.TouchEventHandler<HTMLDivElement> = e => {
    console.log(e.currentTarget.id);
    setFavBrand(user.nickname, e.currentTarget.id, user.gender);
  };
  const selectedIcon = user.brand === brandInfo.brand && (
    <SelectedIconContainer>
      <Icon {...iconPropsGenerator('check-brand', '20')} />
    </SelectedIconContainer>
  );

  return (
    <ItemContainer
      id={brandInfo.brand}
      onTouchEnd={selectBrand}
      className={cx(
        user.brand === brandInfo.brand
          ? SelectedBrandContainer
          : DefaltBrandContainer,
        Column,
        Center
      )}>
      {selectedIcon}
      <IconContainer>{brandInfo.icon}</IconContainer>
      <span>{brandInfo.brand}</span>
    </ItemContainer>
  );
};
export default BrandItem;

const IconContainer = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 46px;
  background-color: bisque;
  color: transparent;
  margin-bottom: 9px;
`;

const ItemContainer = styled.div`
  width: 103px;
  height: 103px;
  position: relative;
  border-radius: 16px;
  padding: 14px 0;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;

const SelectedBrandContainer = css`
  border: 2px solid var(--main, #ff701e);
  background: rgba(255, 112, 30, 0.15);
  color: var(--main, #ff701e);
`;

const SelectedIconContainer = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
`;

const DefaltBrandContainer = css`
  border: 1px solid #edecec;
  background: #fff;
`;
