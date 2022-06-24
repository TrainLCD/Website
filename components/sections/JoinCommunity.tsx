import { isJa } from '../../utils/isJa';
import Container from '../Container';
import { Subtitle, Text, Title } from '../Typography';

const JoinCommunitySection: React.FC = () => {
  return (
    <Container>
      <Title>COMMUNITY</Title>
      <Subtitle>
        {isJa ? 'コミュニティに参加しよう！' : 'Join our community!'}
      </Subtitle>
      <Text>
        {isJa
          ? 'TrainLCDコミュティの新規参加は当分の間ご遠慮いただいております。'
          : 'Please refrain from joining the TrainLCD community for the time being.'}
      </Text>
    </Container>
  );
};

export default JoinCommunitySection;
