import Image from 'next/image';
import styled from 'styled-components';
import appleWatchEnMock from '../../assets/images/applewatch-en.png';
import appleWatchMock from '../../assets/images/applewatch.png';
import { mediaQueries } from '../../constants/media';
import { isJa } from '../../utils/isJa';

const Container = styled.section`
  height: 100vh;
  position: relative;
  padding: 0 32px;
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${mediaQueries.md} {
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 0;
    padding: 0 64px;
  }
`;
const MockupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media ${mediaQueries.md} {
    width: 50%;
  }
`;

const TextsContainer = styled.div`
  width: 100%;
  @media ${mediaQueries.md} {
    width: 50%;
  }
`;

const ShortHeading = styled.p`
  color: #277bc0;
  font-weight: bold;
  margin-top: 32px;
  @media ${mediaQueries.md} {
    font-size: 1.5rem;
    margin-top: 0;
  }
`;

const AccentText = styled.span`
  color: #277bc0;
`;

const Heading = styled.h1`
  line-height: 1.5;
  @media ${mediaQueries.md} {
    font-size: 3rem;
  }
`;

const DescriptionText = styled.p`
  line-height: 1.5;
  font-weight: bold;
  color: #444;
  margin-top: 16px;
  @media ${mediaQueries.md} {
    margin-top: 24px;
    font-size: 1.5rem;
  }
`;

const DescriptionCaptionNumber = styled.sup`
  font-size: 0.5rem;
  @media ${mediaQueries.md} {
    font-size: 1rem;
  }
`;

const DisclaimerText = styled.p`
  font-size: 0.75rem;
  color: #444444;
  margin-top: 12px;
  line-height: 1.5;
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
          スマートウォッチ対応
          <DescriptionCaptionNumber>*3</DescriptionCaptionNumber>
        </ShortHeading>
        <Heading>
          <AccentText>Apple Watch</AccentText>でも使えます
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
