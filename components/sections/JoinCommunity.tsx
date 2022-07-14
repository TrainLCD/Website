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

const JoinCommunitySection: React.FC = () => {
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
          ? `TrainLCDコミュニティでは自分の意見をいち早くアプリに反映させることや、同じTrainLCDユーザーとの交流が出来ます！`
          : `The TrainLCD community is a great place to get your opinions reflected in the application as quickly as possible and to interact with other TrainLCD users!`}
      </Text>
      <InviteContainer>
        <iframe
          src="https://canary.discord.com/widget?id=679751900891185245&theme=dark"
          width="350"
          height="500"
          allowTransparency={true}
          frameBorder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </InviteContainer>
    </Container>
  );
};

export default JoinCommunitySection;
