import { useParams } from 'react-router-dom';

import BrandDetail from '@/components/brand/BrandDetail';
import BrandList from '@/components/brand/BrandList';
import ProductDetail from '@/components/brand/ProductDetail';

import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useShowFooter } from '@/hooks/useShowFooter';
import { brandMapToKor } from '@/utils/convertBrandName';

const Brand = () => {
  const { brandName, productName } = useParams();

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
      {brandName && !productName && <BrandDetail />}
      {productName && <ProductDetail />}
    </>
  );
};

export default Brand;
