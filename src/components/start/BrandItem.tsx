import { useRecoilState } from 'recoil';
import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import convertBrandName from '@/utils/convertBrandName';
import { BrnadItemProps } from '@/types/types';
import { authState } from '@/atoms/atoms';
import { styled } from 'styled-system/jsx';
import { css, cx } from 'styled-system/css';
import { Center, Column } from '@/styles/layout';
import { SmStyle } from '@/styles/styles';

const BrandItem = (brandInfo: BrnadItemProps) => {
  const [userInit, setUserInit] = useRecoilState(authState);

  const selectBrand: React.MouseEventHandler<HTMLDivElement> = e => {
    const selectedFavBrand = {
      ...userInit,
      brand: e.currentTarget.id
    };
    setUserInit(selectedFavBrand);
  };

  const selectedIcon = userInit.brand === brandInfo.brand && (
    <SelectedIconContainer>
      <Icon {...iconPropsGenerator('check-brand', '20')} />
    </SelectedIconContainer>
  );

  const icon = `/png/${brandInfo.brand}.png`;

  return (
    <Container>
      <ItemContainer
        id={brandInfo.brand}
        onClick={selectBrand}
        className={cx(
          userInit.brand === brandInfo.brand
            ? SelectedBrandContainer
            : DefaltBrandContainer,
          Column,
          Center,
          SmStyle
        )}>
        {selectedIcon}
        <IconContainer>
          <IconImg
            src={icon}
            alt={brandInfo.brand}
          />
        </IconContainer>
        <span>{convertBrandName(brandInfo.brand)}</span>
      </ItemContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
`;

const IconContainer = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 46px;
  color: transparent;
  margin-bottom: 9px;
`;
const IconImg = styled.img`
  width: 46px;
  height: 46px;
`;

const ItemContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  background-color: #fff;
`;

export default BrandItem;
