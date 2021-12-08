import { isJa } from '../../utils/isJa';
import Container from '../Container';
import { Subtitle, Text, Title } from '../Typography';

const SupportSection: React.FC = () => {
  return (
    <Container>
      <Title>SUPPORT</Title>
      <Subtitle>{isJa ? 'サポートが必要ですか？' : 'Need support?'}</Subtitle>
      <Text>
        {isJa
          ? 'TrainLCDサービスに関してのサポートは当分の間取りやめさせていただきます。'
          : 'Support for the TrainLCD service will be discontinued for the time being.'}
      </Text>
    </Container>
  );
};

export default SupportSection;
