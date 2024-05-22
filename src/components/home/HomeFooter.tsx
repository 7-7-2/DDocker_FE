import { useNavigate } from 'react-router-dom';
import { HOME_FOOTER_TEXTS } from '@/constants/home';
import { SUPPORT_TEXTS } from '@/constants/support';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Flex } from '@/styles/layout';
import { Medium, Regular } from '@/styles/styles';

const { email, copyright, designedBy, freepik } = HOME_FOOTER_TEXTS;

const HomeFooter = () => {
  const navigate = useNavigate();
  const footerCategories = Object.values(SUPPORT_TEXTS);
  const handleOnClick = (e: React.MouseEvent<HTMLLIElement>) => {
    navigate(`support/${e.currentTarget.id}`);
  };
  return (
    <Container>
      <svg
        width={'80'}
        height={'15'}>
        <use href={`/sprite.svg#icon-ddocker-gray`} />
      </svg>
      <Categories className={Flex}>
        {footerCategories.map(item => (
          <Category
            className={cx(Align, Medium)}
            key={item.title}
            id={item.type}
            onClick={handleOnClick}>
            {item.title}
          </Category>
        ))}
      </Categories>
      <DDockerInfo className={Regular}>{email}</DDockerInfo>
      <Text className={Regular}>
        {designedBy}
        <a href="https://kr.freepik.com/free-psd/3d-background-for-coffee-shop_76601642.htm">
          {freepik}
        </a>
      </Text>
      <br />
      <Text className={Regular}>{copyright}</Text>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  background-color: #fff;
  margin: 48px -20px -20px;
  padding: 30px 20px 24px;
  line-height: 22px;
  color: var(--colors-mid-grey);
  font-size: var(--font-sizes-sm);
`;

const Categories = styled.ul`
  margin: 20px 0 4px;
  & :first-child {
    padding-left: 0;
  }
  & :last-child {
    border-right: none;
    font-weight: 600;
  }
`;

const Category = styled.li`
  padding: 0 8px;
  border-right: 1px solid #dadada;
  height: 10px;
`;

const DDockerInfo = styled.div`
  margin: 10px 0 36px;
`;

const Text = styled.span`
  font-size: var(--font-sizes-xs);
  color: var(--colors-subtext);
`;
export default HomeFooter;
