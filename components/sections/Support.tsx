import styled from 'styled-components';
import { isJa } from '../../utils/isJa';
import Container from '../Container';
import { Subtitle, Text, Title } from '../Typography';

const ButtonContainer = styled.div`
  display: flex;
`;

const ButtonLink = styled.a`
  border: 2px solid #03a9f4;
  background-color: white;
  border-radius: 32px;
  color: #03a9f4;
  font-weight: bold;
  font-size: 1rem;
  padding: 12px 24px;
  margin: 32px auto 0 auto;
  display: block;
  outline: none;
  text-decoration: none;
`;

const SupportSection: React.FC = () => {
  return (
    <Container>
      {isJa && <Title>SUPPORT</Title>}
      <Subtitle>{isJa ? 'サポートが必要ですか？' : 'Need support?'}</Subtitle>
      <Text>
        {isJa
          ? 'TrainLCDのサービスなどにお気づきの点があった場合、ご気軽にご連絡ください。'
          : 'If you have any questions about TrainLCD, please feel free to contact us.'}
      </Text>

      <ButtonContainer>
        <ButtonLink
          href="https://forms.gle/bWvwyincJpz76GK86"
          target="_blank"
          rel="noopener noreferrer"
        >
          {isJa ? 'サポートに連絡する' : 'Contact support'}
        </ButtonLink>
      </ButtonContainer>
    </Container>
  );
};

export default SupportSection;
