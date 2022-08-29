import Image from 'next/image';
import styled from 'styled-components';
import iPadEnMock from '../../assets/images/ipad-en.png';
import iPadMock from '../../assets/images/ipad.png';
import { isJa } from '../../utils/isJa';

const Container = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 64px;
  background-color: #fcfcfc;
`;
const MockupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const TextsContainer = styled.div`
  width: 50%;
`;

const ShortHeading = styled.p`
  font-size: 1.5rem;
  color: #277bc0;
  font-weight: bold;
`;

const AccentText = styled.span`
  color: #277bc0;
`;

const Heading = styled.h1`
  font-size: 3rem;
  line-height: 1.5;
`;

const DescriptionText = styled.p`
  line-height: 1.5;
  font-weight: bold;
  color: #444;
  font-size: 1.5rem;
  margin-top: 24px;
`;

const DescriptionCaptionNumber = styled.sup`
  font-size: 1rem;
`;

const DisclaimerText = styled.p`
  font-size: 0.75rem;
  color: #444444;
  margin-top: 12px;
  line-height: 1.5;
`;

const IPadSection: React.FC = () => {
  return (
    <Container>
      <TextsContainer>
        <ShortHeading>タブレット対応</ShortHeading>
        <Heading>
          <AccentText>iPad</AccentText>で使えます
        </Heading>
        <DescriptionText>
          iPadと一緒に使えば、
          <br />
          もっとわかりやすく次の駅を知ることができます。
          最新のどのiPadにも対応している<sup>*2</sup>ため、
          <br />
          アプリをダウンロードしてすぐ快適に使えます。
          <DescriptionCaptionNumber>*2</DescriptionCaptionNumber>
        </DescriptionText>
        <DisclaimerText>
          <sup>*2</sup>
          Wi-FiモデルのiPadはGPSを搭載していないため、一定条件下で動作が不安定になる可能性があります。
        </DisclaimerText>
      </TextsContainer>
      <MockupContainer>
        <Image
          src={isJa ? iPadMock : iPadEnMock}
          alt="iPad"
          width={580}
          height={430.22}
        />
      </MockupContainer>
    </Container>
  );
};

export default IPadSection;
