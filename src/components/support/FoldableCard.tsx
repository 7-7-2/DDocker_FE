import Icon from '@/components/common/Icon';
import { useToggle } from '@/hooks/post/useToggle';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { CUSTOMER_SUPPORT_TEXTS } from '@/constants/support';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between, Flex } from '@/styles/layout';
import { CustomerItem, CustomerTitle, Medium, Semibold } from '@/styles/styles';

const { questionMark } = CUSTOMER_SUPPORT_TEXTS.FAQ;

const FoldableCard = ({
  data
}: {
  data: {
    postId: string;
    title: string;
    contents: string;
  };
}) => {
  const { toggle, handleToggle } = useToggle();
  return (
    <Container className={CustomerItem}>
      <FoledCard className={cx(Flex, Between)}>
        <TextArea onClick={handleToggle}>
          <QuestionMark className={Medium}>{questionMark}</QuestionMark>
          <CardTitle
            className={cx(toggle ? Semibold : undefined, CustomerTitle)}>
            {data.title}
          </CardTitle>
        </TextArea>
        <BtnArea onClick={handleToggle}>
          <Icon
            {...iconPropsGenerator(
              !toggle ? 'folded-button' : 'unfolded-button'
            )}
          />
        </BtnArea>
      </FoledCard>
      {toggle && (
        <UnfoledCard className={cx(Flex, Between)}>{data.contents}</UnfoledCard>
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;
const FoledCard = styled.div`
  min-height: 54px;
  padding: 16px 0;
  line-height: 22px;
`;
const TextArea = styled.button``;
const CardTitle = styled.span``;
const QuestionMark = styled.span`
  margin-right: 8px;
  color: var(--colors-main);
`;
const BtnArea = styled.button``;
const UnfoledCard = styled.div`
  width: 100%;
  margin: 4px 0 16px;
  padding: 0 18px;
  line-height: 18px;
  white-space: pre-wrap;
  font-size: var(--font-sizes-xs);
`;

export default FoldableCard;
