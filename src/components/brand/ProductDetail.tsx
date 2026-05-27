import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';
import CoffeeOptionSelection from '@/components/common/coffeeSelection/CoffeeOptionSelection';
import CaffeineInfo from '@/components/home/CaffeineInfo';

import { caffeineFilterState, caffeineIntakeState } from '@/atoms/atoms';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Column, Flex, FlexCenter } from '@/styles/layout';
import {
  colorMidGrey,
  DefaultBtn,
  Gap24,
  Gap6,
  MarginT24,
  Medium,
  SectionDivier,
  Semibold
} from '@/styles/styles';

const ProductDetail = () => {
  const { state } = useLocation();
  const [caffeineIntake, setCaffeineIntake] =
    useRecoilState(caffeineIntakeState);
  const setCaffeine = useSetRecoilState(caffeineFilterState);
  useEffect(() => {
    state &&
      setCaffeine({ caffeine: state.caffeine, menuCaffeine: state.caffeine });
    state &&
      setCaffeineIntake({
        ...caffeineIntake,
        caffeine: state.caffeine,
        brand: state.brand,
        productName: state.menu
      });
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);
  const scrollAnchor = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (scrollAnchor.current) {
      observer.observe(scrollAnchor.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <HeaderBackground
        style={{ backgroundColor: `${!isScrolled ? '#f1f1f1' : '#fff'}` }}
      />
      <Container>
        <Img ref={scrollAnchor}></Img>
        <ContentsBox>
          <div className={Column}>
            <Brand className={Medium}>스타벅스</Brand>
            <ProductName className={Semibold}>아메리카노</ProductName>
          </div>
          <CoffeeOptionSelection />
          <div className={cx(SectionDivier, MarginT24)} />

          <SimilarItemList className={Column}>
            <span
              className={Semibold}
              style={{ fontSize: 'var(--font-sizes-lg)' }}>
              다른 브랜드의 '{state.menu}'
            </span>
            <SimilarItem>
              <TemporaryImg />
              <Info className={cx(Column, Align)}>
                <span className={colorMidGrey}>스타벅스</span>
                <span
                  className={Semibold}
                  style={{ fontSize: 'var(--font-sizes-sm)' }}>
                  250mg
                </span>
                <div className={cx(Medium, Flex, Align, Gap6)}>
                  <Icon {...iconPropsGenerator('up', '7')} />
                  <span style={{ color: 'var(--colors-delete-red)' }}>35</span>
                </div>
              </Info>
            </SimilarItem>
          </SimilarItemList>
          <div style={{ height: '102px' }} />

          <BrandFooter className={Column}>
            <div>
              <CaffeineInfo />
            </div>
            <ButtonContainer className={cx(FlexCenter, Gap24)}>
              <div>
                <Icon {...iconPropsGenerator('fav')} />
              </div>
              <Button
                text={'등록하기'}
                onClick={() => {}}
                className={DefaultBtn}
              />
            </ButtonContainer>
          </BrandFooter>
        </ContentsBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-left: -20px;
  /* margin-top: -56px; */
  height: 100dvh;
  width: 100dvw;
  max-width: 500px;
  position: relative;
  overflow-y: scroll;
  color: var(--colors-main-dark);
  background-color: #f1f1f1;
`;

const HeaderBackground = styled.div`
  width: 100dvw;
  height: 56px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const SimilarItemList = styled.div`
  padding: 24px 0;
  gap: 20px;
`;
const SimilarItem = styled.div`
  width: fit-content;
  align-content: center;
`;
const Info = styled.div`
  margin-top: 12px;
  font-size: var(--font-sizes-xs);
  gap: 4px;
`;
const ContentsBox = styled.div`
  height: auto;
  width: 100%;
  position: absolute;
  top: 218px;
  padding: 20px;
  background-color: #fff;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  z-index: 1;
`;
const Brand = styled.span`
  line-height: 22px;
  color: var(--colors-mid-grey);
`;
const ProductName = styled.span`
  font-size: 22px;
  line-height: 30px;
  margin-bottom: -4px;
`;
const BrandFooter = styled.div`
  height: 123px;
  width: 100%;
  padding: 10px 20px 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  border-top: solid 1px var(--colors-border-grey);
`;
const ButtonContainer = styled.div`
  margin-top: -12px;
`;

const TemporaryImg = styled.div`
  width: 72px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: #f1f1f1;
`;

const Img = styled.div`
  height: 218px;
  aspect-ratio: 1;
  margin: auto;
`;
export default ProductDetail;
