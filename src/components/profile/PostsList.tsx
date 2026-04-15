import { useNavigate } from 'react-router-dom';

import Icon from '@/components/common/Icon';

import { UserProfileListDataTypes } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { brandMapToKor } from '@/utils/convertBrandName';
import { PROFILE_TEXTS } from '@/constants/profile';
import { CAFFEINE_TEXTS } from '@/constants/common';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between, Column, Flex } from '@/styles/layout';
import { Bold, Medium, Semibold } from '@/styles/styles';

const { privatePost } = PROFILE_TEXTS;

const PostsList = ({ data }: { data: UserProfileListDataTypes[] }) => {
  const navigate = useNavigate();
  const goToPostDetail: React.MouseEventHandler<HTMLImageElement> = (
    e: React.MouseEvent<HTMLImageElement>
  ) => {
    navigate(`/post/${e.currentTarget.id}`);
  };
  // 추후 수정 예정 img error handlling && 디자인 업데이트

  return (
    <AllPostsList className={Column}>
      {data?.map(item => (
        <PostItem
          key={item.postId}
          id={item.postId}
          onClick={goToPostDetail}
          className={cx(Flex, Between)}>
          <div className={cx(Column, Between)}>
            <div className={Column}>
              <Brand>{brandMapToKor(item.brand)}</Brand>
              <ProductName className={Semibold}>{item.productName}</ProductName>
            </div>
            <Description>{item.description}</Description>
            <Caffeine className={Bold}>
              {item.caffeine}
              {CAFFEINE_TEXTS.unit}
            </Caffeine>
          </div>
          <div className={Column}>
            {item.photo && <Img src={item.photo}></Img>}
            {item.visibility === 0 && (
              <Private className={cx(Medium, Flex)}>
                <Icon {...iconPropsGenerator('lock-list', '18')} />
                {privatePost}
              </Private>
            )}
          </div>
        </PostItem>
      ))}
    </AllPostsList>
  );
};

const AllPostsList = styled.div`
  padding-top: 28px;
  gap: 18px;
`;
const PostItem = styled.div`
  height: 130px;
  box-shadow: inset 0 -1px 0 0 var(--colors-border-grey);
  padding-bottom: 20px;
`;
const Brand = styled.span`
  line-height: 18px;
  font-size: var(--font-siezs-xs);
  color: var(--colors-mid-grey);
`;
const ProductName = styled.span`
  line-height: 24px;
  font-size: var(--font-sizes-base);
  color: var(--colors-main-dark);
`;
const Description = styled.span`
  margin-top: 10px;
  line-height: 20px;
  font-size: var(--font-sizes-sm);
  color: var(--colors-main-dark);
`;
const Caffeine = styled.div`
  width: 56px;
  height: 26px;
  font-size: var(--font-sizes-xs);
  text-align: center;
  line-height: 20px;
  border-radius: 20px;
  border: 1px solid var(--colors-dark-grey);
  margin-top: 12px;
  padding-top: 1px;
`;
const Img = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 6px;
`;
const Private = styled.div`
  font-size: var(--font-sizes-xs);
  color: var(--colors-sub-text);
  gap: 2px;
`;

export default PostsList;
