import styled from 'styled-components';
import iPadMock from '../../assets/images/ipad.png';
import { Media, mediaQueries } from '../../constants/media';
import DescriptionText from '../DescriptionText';
import ImageWithoutSize from '../ImageWithoutSize';

const Container = styled.section`
  min-height: 100vh;
  position: relative;
  padding: 32px;
  background-color: #fefefe;

  @media ${mediaQueries.md} {
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
  margin-top: 24px;
  @media ${mediaQueries.md} {
    width: 50%;
  }
`;

const ShortHeading = styled.p`
  color: #277bc0;
  font-weight: bold;
  @media ${mediaQueries.md} {
    font-size: 1.5rem;
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

const TextFragment = () => {
  return (
    <TextsContainer>
      <ShortHeading>タブレット対応</ShortHeading>
      <Heading>
        <AccentText>iPad</AccentText>
        で使えます
      </Heading>
      <DescriptionText>
        iPadと一緒に使えば、 もっとわかりやすく次の駅を知ることができます。
        <br />
        最新のどのiPadにも対応しているため、
        <br />
        アプリをダウンロードしてすぐ快適に使えます。
        <DescriptionCaptionNumber>*2</DescriptionCaptionNumber>
      </DescriptionText>
      <DisclaimerText>
        <sup>*2</sup>
        Wi-FiモデルのiPadはGPSを搭載していないため、一定条件下で動作が不安定になる場合があります。
      </DisclaimerText>
    </TextsContainer>
  );
};

const MockupFragment = () => {
  return (
    <MockupContainer>
      <ImageWithoutSize src={iPadMock} alt="iPad" />
    </MockupContainer>
  );
};

const StyledMedia = styled(Media)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${mediaQueries.md} {
    flex-direction: row;
  }
`;

const TabletSection: React.FC = () => {
  return (
    <Container>
      <StyledMedia greaterThanOrEqual="lg">
        <TextFragment />
        <MockupFragment />
      </StyledMedia>
      <StyledMedia lessThan="lg">
        <MockupFragment />
        <TextFragment />
      </StyledMedia>
    </Container>
  );
};

export default TabletSection;
