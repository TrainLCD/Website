import styled from 'styled-components';

type Props = {
  preText: string;
  num: number;
  afterText: string;
  en: boolean;
};

const Container = styled.div`
  width: 108px;
  height: 108px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  background-color: white;
`;
const TopContainer = styled.div`
  display: flex;
  height: calc(100% - 32px);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 16px 16px 0 0;
`;
const AfterTextContainer = styled.div`
  background-color: #03a9f4;
  height: 32px;
  border-radius: 0 0 16px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;
  margin: -1px 0;
`;
const AfterText = styled.p`
  color: white;
  font-size: 0.75rem;
`;
const PreText = styled.p<{ en: boolean }>`
  font-weight: bold;
  color: #333;
  text-align: center;
  line-height: 1.25;
  font-size: ${({ en }) => (en ? '0.75rem' : '1rem')};
  margin-bottom: ${({ en }) => (en ? '8px' : '4px')};
  white-space: pre-wrap;
`;
const Num = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const NumberBox: React.FC<Props> = ({ preText, num, afterText, en }: Props) => (
  <Container>
    <TopContainer>
      <PreText en={en}>{preText}</PreText>
      <Num>{num.toLocaleString()}</Num>
    </TopContainer>
    <AfterTextContainer>
      <AfterText>{afterText}</AfterText>
    </AfterTextContainer>
  </Container>
);

export default NumberBox;
