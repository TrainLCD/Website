import styled from 'styled-components';
import { FeatureContainer } from '../../FeatureItemElements';
import NumberBox from '../../NumberBox';

const NumbersContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: center;
  width: 100%;
  @media (min-width: 800px) {
    justify-content: space-around;
    max-width: 480px;
  }
`;

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

const Caption = styled.p`
  color: #555;
  font-weight: bold;
  margin-top: 16px;
  font-size: 0.75rem;
`;

const SUP = styled.sup`
  font-size: 70%;
  vertical-align: top;
  position: relative;
`;

const AreaFeatureSection: React.FC = () => {
  return (
    <FeatureContainer>
      <NumbersContainer>
        <NumberBox preText="全国の" num={9136} afterText="駅に対応" />
        <NumberBox preText="全国の" num={617} afterText="路線に対応" />
        <NumberBox preText="全国の" num={171} afterText="鉄道会社に対応" />
      </NumbersContainer>
      <TextContainer>
        <Heading style={{ marginBottom: '12px' }}>日本全国サービス対象</Heading>
        <Description>
          地下鉄路線や一部の路線<SUP>*1</SUP>
          を除き、日本全国のほとんどの路線に対応しています。
        </Description>
        <Caption>
          <SUP>*1</SUP>鶴見線、一部直通路線・支線など
        </Caption>
      </TextContainer>
    </FeatureContainer>
  );
};

export default AreaFeatureSection;
