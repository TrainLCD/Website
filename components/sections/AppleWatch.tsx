import Image from 'next/image';
import styled from 'styled-components';
import appleWatchEnMock from '../../assets/images/applewatch-en.png';
import appleWatchMock from '../../assets/images/applewatch.png';
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

const DisclaimerText = styled.p`
  font-size: 0.75rem;
  color: #444444;
  margin-top: 12px;
  line-height: 1.5;
`;

const ResizedSup = styled.sup`
  font-size: 1rem;
`;

const AppleWatchSection: React.FC = () => {
  return (
    <Container>
      <MockupContainer>
        <Image
          src={isJa ? appleWatchMock : appleWatchEnMock}
          alt="TrainLCD"
          width={289.44}
          height={430}
        />
      </MockupContainer>
      <TextsContainer>
        <ShortHeading>
          スマートウォッチ対応<ResizedSup>*3</ResizedSup>
        </ShortHeading>
        <Heading>
          <AccentText>日本全国</AccentText>サービス対象
        </Heading>
        <DescriptionText>
          Apple Watchと組み合わせれば
          <br />
          手首を見るだけで今停車している駅や、
          <br />
          次に停まる駅を知ることができます。
        </DescriptionText>
        <DisclaimerText>
          <sup>*3</sup>
          Apple Watchのみの対応となります。現在Wear OS等には対応していません。
        </DisclaimerText>
      </TextsContainer>
    </Container>
  );
};

export default AppleWatchSection;
