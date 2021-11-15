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
          ? `日本全国の鉄道路線で使える\n新感覚のナビゲーションアプリです。`
          : 'Can be used on routes all over Japan\nNew sense navigation app.'}
      </Heading>
      <Text>
        {isJa
          ? `あなたのスマートフォンで使える電車のLCD。\n満員電車でどこにいるかわからないときや、乗ったことのない路線に乗車する際など、\nきっとあなたの役に立つはずです。`
          : `LCD of the train that can be used on your smartphone.\nIf you don't know where you are on a crowded train, or if you're on a route you've never taken,\nit's sure to help you.`}
      </Text>
    </Container>
  );
};

export default AboutSection;
