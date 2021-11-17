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
  text-align: center;
  margin-bottom: 12px;
  line-height: 1.5;
`;

const Description = styled.p`
  font-weight: bold;
  text-align: center;
  color: #555;
  line-height: 1.5;
`;
const ImageContainer = styled.div`
  overflow: hidden;
  @media (min-width: 800px) {
    max-width: 30%;
  }
`;

const IPadFeatureSection: React.FC = () => {
  return (
    <FeatureContainer>
      <ImageContainer>
        <Image
          src={isJa ? '/images/ipad.png' : '/images/ipad-en.png'}
          alt={isJa ? 'iPadで動くTrainLCD' : 'TrainLCD running on iPad'}
          width={2360}
          height={1640}
        />
      </ImageContainer>
      <TextContainer>
        <Heading style={{ marginBottom: '12px' }}>
          {isJa ? 'iPadに対応' : 'Compatible with iPad.'}
        </Heading>
        <Description>
          {isJa
            ? 'iPadと一緒に使えば、もっとわかりやすく次の駅を知ることができます。'
            : 'If you use it with an iPad, you can know the next station more easily.'}
          <br />
          {isJa
            ? '最新のどのiPadにも対応しているため、アプリをダウンロードしてすぐ快適に使えます。'
            : `It's compatible with all the latest iPads, so you can download the app and use it comfortably right away.`}
        </Description>
      </TextContainer>
    </FeatureContainer>
  );
};

export default IPadFeatureSection;
