import styled from 'styled-components';
import { isJa } from '../../../utils/isJa';
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
  const preText = isJa ? '全国の' : 'Compatible\nwith';

  return (
    <FeatureContainer>
      <NumbersContainer>
        <NumberBox
          preText={preText}
          num={9136}
          afterText={isJa ? '駅に対応' : 'Stations'}
          en={!isJa}
        />
        <NumberBox
          preText={preText}
          num={617}
          afterText={isJa ? '路線に対応' : 'Lines'}
          en={!isJa}
        />
        <NumberBox
          preText={preText}
          num={171}
          afterText={isJa ? '鉄道会社に対応' : 'Companies'}
          en={!isJa}
        />
      </NumbersContainer>
      <TextContainer>
        <Heading style={{ marginBottom: '12px' }}>
          {isJa ? '日本全国サービス対象' : 'Service target all over Japan'}
        </Heading>
        <Description>
          {isJa
            ? '一部例外を除き、日本全国のほとんどの路線に対応しています。'
            : 'With some exceptions, it supports most routes throughout Japan.'}
          <SUP>*1</SUP>
        </Description>
        <Caption>
          <SUP>*1</SUP>
          {isJa
            ? '地下鉄などの電波の入りづらい路線、鶴見線などの入り組んだ路線は一部サービス保証外となります。'
            : 'Some services are not guaranteed for lines such as the subway where radio waves are difficult to enter, and complicated lines such as the Tsurumi line.'}
        </Caption>
      </TextContainer>
    </FeatureContainer>
  );
};

export default AreaFeatureSection;
