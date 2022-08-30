import Image from 'next/image';
import styled from 'styled-components';
import mojikoEnMock from '../../assets/images/mockup/mojiko-en.png';
import mojikoMock from '../../assets/images/mockup/mojiko.png';
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
  @media ${mediaQueries.md} {
    font-size: 1.5rem;
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

const AboutSection: React.FC = () => {
  return (
    <Container>
      <MockupContainer>
        <Image
          src={isJa ? mojikoMock : mojikoEnMock}
          alt="TrainLCD"
          width={542.25}
          height={288.375}
        />
      </MockupContainer>
      <TextsContainer>
        <ShortHeading>サービス対象エリア</ShortHeading>
        <Heading>
          <AccentText>日本全国</AccentText>サービス対象
        </Heading>
        <DescriptionText>
          一部例外を除き、日本全国のほとんどの
          <br />
          鉄道路線に対応しています
          <DescriptionCaptionNumber>*1</DescriptionCaptionNumber>
        </DescriptionText>
        <DisclaimerText>
          <sup>*1</sup>
          地下鉄などの電波の入りづらい路線、鶴見線などの入り組んだ路線は一部サービス保証外となります。
          <br />
          &nbsp;
          またサービス対象は鉄道路線のみであり、バス等の移動手段には対応しておりません。
        </DisclaimerText>
      </TextsContainer>
    </Container>
  );
};

export default AboutSection;
