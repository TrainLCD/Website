import Image from 'next/image';
import styled from 'styled-components';
import { isJa } from '../../../utils/isJa';
import { FeatureContainer } from '../../FeatureItemElements';

const TextContainer = styled.div`
  margin-top: 24px;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.5;
  @media (min-width: 800px) {
    text-align: center;
  }
`;

const Description = styled.p`
  font-weight: bold;
  color: #555;
  line-height: 1.5;
  @media (min-width: 800px) {
    text-align: center;
  }
`;
const ImageContainer = styled.div`
  overflow: hidden;
  @media (min-width: 800px) {
    max-width: 30%;
  }
`;

const AppleWatchFeatureSection: React.FC = () => {
  return (
    <FeatureContainer>
      <ImageContainer>
        <Image
          src={isJa ? '/images/applewatch.png' : '/images/applewatch-en.png'}
          alt={
            isJa
              ? 'Apple Watchで動くTrainLCD'
              : 'TrainLCD running on Apple Watch'
          }
          width={313}
          height={465}
        />
      </ImageContainer>
      <TextContainer>
        <Heading style={{ marginBottom: '12px' }}>
          {isJa ? 'Apple Watchに対応' : 'Compatible with Apple Watch.'}
        </Heading>
        <Description>
          {isJa
            ? 'Apple Watchと一緒に使えば、さらに便利に次の駅を知ることができます。'
            : 'If you use it with your Apple Watch, you can find out the next station even more conveniently.'}
          <br />
          {isJa
            ? 'iPhoneを出せないときでも、手首を見るだけで今停車している駅や、次に停まる駅を知ることが出来ます。'
            : `Even when you can't take out your iPhone, you can find out which station is currently stopped or next by just looking at your wrist.`}
        </Description>
      </TextContainer>
    </FeatureContainer>
  );
};

export default AppleWatchFeatureSection;
