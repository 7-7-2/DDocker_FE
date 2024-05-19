import { styled } from 'styled-system/jsx';
//PRESENTATIONAL
const Notice = ({
  username,
  text,
  time,
  onClick
}: {
  username: string;
  text: string;
  time: string;
  onClick: () => void;
}) => {
  return (
    <Container>
      <Username>{username}</Username>
      <NoticeText onClick={onClick}>{text}</NoticeText>
      <NoticeTime>{time}</NoticeTime>
    </Container>
  );
};

const Container = styled.div`
  padding-left: 12px;
  padding-right: 16px;
  height: 32px;
  line-height: 16px;
  width: 100%;
`;

const Common = styled.span`
  font-size: var(--font-sizes-xs);
`;

const Username = styled(Common)`
  color: #313131;
  font-weight: 600;
`;
const NoticeText = styled(Common)`
  color: #313131;
`;
const NoticeTime = styled(Common)`
  color: var(--colors-mid-grey);
`;

export default Notice;
