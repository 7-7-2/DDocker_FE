import BrandDetail from '@/components/brand/BrandDetail';
import BrandList from '@/components/brand/BrandList';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useShowFooter } from '@/hooks/useShowFooter';
import { brandMapToKor } from '@/utils/convertBrandName';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-system/jsx';

const Brand = () => {
  const { brandName } = useParams();

  const getPageHeader = () => {
    if (brandName) return ['back', `${brandMapToKor(brandName)}`, 'icons'];
    else return ['back', '전체 브랜드', ''];
  };
  const brandPageHeader = getPageHeader();
  useComposeHeader(...brandPageHeader);
  useShowFooter(false);

  return (
    <>
      {!brandName && <BrandList />}
      {brandName && <BrandDetail />}
    </>
  );
};

export default Brand;
