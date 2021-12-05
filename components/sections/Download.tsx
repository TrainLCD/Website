import { isJa } from '../../utils/isJa';
import Container from '../Container';
import { Subtitle, Text, Title } from '../Typography';

const DownloadSection: React.FC = () => {
  return (
    <Container odd>
      <Title>DOWNLOAD</Title>
      <Subtitle>{isJa ? 'TrainLCDを使ってみよう' : 'Try TrainLCD'}</Subtitle>
      <Text>
        {isJa
          ? 'TrainLCDのサービス一部中断の間、アプリストアでの公開を中止させていただいております。'
          : 'While the TrainLCD service is partially suspended, we will stop publishing it on the app store.'}
      </Text>
    </Container>
  );
};

export default DownloadSection;
