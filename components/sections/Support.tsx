import styled from 'styled-components';
import { isJa } from '../../utils/isJa';
import ButtonLink from '../ButtonLink';
import Container from '../Container';
import { Subtitle, Text, Title } from '../Typography';

const ButtonContainer = styled.div`
  display: flex;
`;

const SupportSection: React.FC = () => {
  return (
    <Container>
      <Title>SUPPORT</Title>
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
