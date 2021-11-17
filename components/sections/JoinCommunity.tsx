import styled from 'styled-components';
import { isJa } from '../../utils/isJa';
import Container from '../Container';
import { Subtitle, Text, Title } from '../Typography';

const InviteContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
`;

const JoinCommunity: React.FC = () => {
  return (
    <Container>
      <Title>COMMUNITY</Title>
      <Subtitle>
        {isJa ? 'コミュニティに参加しよう！' : 'Join our community!'}
      </Subtitle>
      <Text>
        {isJa
          ? 'アプリを気に入っていっていただけましたか？ではぜひTrainLCD Discordコミュニティに参加しましょう！'
          : 'Did you like the app? Join the TrainLCD Discord community!'}
        <br />
        {isJa
          ? `TrainLCDコミュニティではアプリへの早期アクセスや、自分の意見をいち早くアプリに反映させることが出来ます！`
          : `In the TrainLCD community, you can access the app early and reflect your opinion in the app as soon as possible!`}
      </Text>
      <InviteContainer>
        <iframe
          src="https://discord.com/widget?id=679751900891185245&theme=dark"
          width="350"
          height="500"
          frameBorder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </InviteContainer>
    </Container>
  );
};

export default JoinCommunity;
