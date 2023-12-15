import { styled } from 'styled-system/jsx';
//PRESENTATIONAL
const Notice = ({
  username,
  text,
  time
}: {
  username: string;
  text: string;
  time: string;
}) => {
  return (
    <Container>
      <Username>{username}</Username>
      <NoticeText>{text}</NoticeText>
      <NoticeTime>{time}</NoticeTime>
    </Container>
  );
};

const Container = styled.div`
  padding-left: 12px;
  padding-right: 16px;
  height: 32px;
  line-height: 16px;
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
  color: #767676;
`;

export default Notice;
