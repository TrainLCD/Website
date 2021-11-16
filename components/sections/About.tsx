import Image from 'next/image';
import styled from 'styled-components';
import { Subtitle, Text, Title } from '../../components/Typography';
import { ShowingImage } from '../../models/ShowingImage';
import { isJa } from '../../utils/isJa';
import Container from '../Container';

type Props = {
  showingImg: ShowingImage;
};

const Heading = styled.h3`
  font-size: 1.5rem;
  margin-top: 32px;
  color: #333;
  text-align: center;
  line-height: 1.5;
  white-space: pre-wrap;
`;
const Mockup = styled.div`
  margin-top: 32px;
  text-align: center;
`;

const AboutSection: React.FC<Props> = ({ showingImg }: Props) => {
  return (
    <Container id="about">
      {isJa && <Title>CONCEPT</Title>}
      <Subtitle>{isJa ? 'TrainLCDのコンセプト' : 'What is TrainLCD?'}</Subtitle>
      <Mockup>
        <Image
          src={showingImg.mock}
          alt="TrainLCD"
          width={542.25}
          height={288.375}
        />
      </Mockup>
      <Heading>
        {isJa
          ? `日本全国の鉄道路線で使える\n新感覚のナビゲーションアプリです`
          : 'Can be used on routes all over Japan\nNew sense navigation app.'}
      </Heading>
      <Text>
        {isJa
          ? `あなたのスマートフォンで使える電車のLCD。
          満員電車でどこにいるかわからないときや、乗ったことのない路線に乗車する際など。
          寝過ごすかもしれない？でも大丈夫。通知を受け取れます。
          さらに、Apple Watchでリアルタイムに自分が今どこにいるかも確認できます。
          今までにありそうでなかった新感覚ナビゲーションアプリ「TrainLCD」きっとあなたの役に立つはずです。`
          : `LCD of the train that can be used on your smartphone.
          When you don't know where you are on a crowded train, or when you get on a route you have never taken.
          May I oversleep? but it's okay. You will be notified.
          In addition, you can see where you are in real time on your Apple Watch.
          A new type of navigation app "Train LCD" that has never been seen before will surely be useful to you.`}
      </Text>
    </Container>
  );
};

export default AboutSection;
