import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import styled from 'styled-components';
import mojikoEnMock from '../../assets/images/mockup/mojiko-en.png';
import mojikoMock from '../../assets/images/mockup/mojiko.png';
import { mediaQueries } from '../../constants/media';
import useIsJa from '../../hooks/useIsJa';
import DescriptionText from '../DescriptionText';

const Container = styled.section`
  min-height: 100vh;
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
  white-space: pre-wrap;
  @media ${mediaQueries.md} {
    font-size: 1.5rem;
  }
`;

const AccentText = styled.span`
  color: #277bc0;
`;

const Heading = styled.h3`
  line-height: 1.25;
  white-space: pre-wrap;
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
  white-space: pre-wrap;
`;

const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  const isJa = useIsJa();

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
        <ShortHeading>{t('section.serviceArea.shortHeading')}</ShortHeading>
        {isJa ? (
          <Heading>
            <AccentText>
              {t('section.serviceArea.jaOnly.throughoutJapan')}
            </AccentText>
            {t('section.serviceArea.jaOnly.serviceTarget')}
          </Heading>
        ) : (
          <Heading>
            <AccentText>
              {t('section.serviceArea.enOnly.nationwide')}&nbsp;
            </AccentText>
            {t('section.serviceArea.enOnly.svcCoverageInJpn')}
          </Heading>
        )}
        <DescriptionText>
          {t('section.serviceArea.description')}
          <DescriptionCaptionNumber>*1</DescriptionCaptionNumber>
        </DescriptionText>
        <DisclaimerText>
          <sup>*1</sup>
          {t('section.serviceArea.disclaimer')}
        </DisclaimerText>
      </TextsContainer>
    </Container>
  );
};

export default AboutSection;
