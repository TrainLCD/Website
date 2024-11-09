import Image from 'next/image';
import styled from 'styled-components';
import appleWatchAppMock from '../../assets/images/applewatch_app.png';
import appleWatchLiveActivitiesMock from '../../assets/images/applewatch_la.png';
import { mediaQueries } from '../../constants/media';
import DescriptionText from '../DescriptionText';

const Container = styled.section`
  min-height: 100vh;
  position: relative;
  padding: 32px;
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
const MockupWithDisclaimerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${mediaQueries.md} {
    width: 100%;
    height: 430px;
  }
`;
const MockupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  gap: 16px;
  @media ${mediaQueries.md} {
    margin-bottom: 24px;
    gap: 32px;
  }
`;

const TextsContainer = styled.div`
  width: 100%;
  margin-top: 24px;
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

const Heading = styled.h3`
  line-height: 1.25;
  font-size: 1.5rem;
  @media ${mediaQueries.md} {
    font-size: 3rem;
  }
`;

const HeadingCaptionNumber = styled.sup`
  font-size: 1rem;
  color: #277bc0;
  @media ${mediaQueries.md} {
    font-size: 1.25rem;
  }
`;

const DisclaimerText = styled.p`
  font-size: 0.75rem;
  color: #444444;
  margin-top: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const WearableSection: React.FC = () => {
  return (
    <Container>
      <MockupWithDisclaimerContainer>
        <MockupContainer>
          <Image
            width={289.44}
            height={430}
            src={appleWatchLiveActivitiesMock}
            alt="Smart Stack Live Activities"
            style={{ objectFit: 'contain' }}
          />

          <Image
            width={289.44}
            height={430}
            src={appleWatchAppMock}
            alt="Apple Watch App"
            style={{ objectFit: 'contain' }}
          />
        </MockupContainer>
      </MockupWithDisclaimerContainer>
      <TextsContainer>
        <ShortHeading>満員電車でも安心</ShortHeading>
        <Heading>
          <AccentText>スマートウォッチ</AccentText>
          <HeadingCaptionNumber>*3</HeadingCaptionNumber>
          <br />
          でも使えます
        </Heading>

        <DescriptionText>
          Apple WatchもしくはWear OS by
          Google搭載スマートウォッチ組み合わせれば手首を見るだけで今停車している駅や、
          <br />
          次に停まる駅を知ることができます。
        </DescriptionText>
        <DisclaimerText>
          <sup>*3</sup>
          Wear OS by
          Googleでのご使用はAndroidスマートフォンとペアリングされている必要があります。
          <br />
          iPhoneとペアリングされている場合はご使用になれませんのでご了承下さい。
        </DisclaimerText>
      </TextsContainer>
    </Container>
  );
};

export default WearableSection;
