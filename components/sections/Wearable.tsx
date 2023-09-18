import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import styled from 'styled-components';
import appleWatchEnMock from '../../assets/images/applewatch-en.png';
import appleWatchMock from '../../assets/images/applewatch.png';
import { mediaQueries } from '../../constants/media';
import useIsJa from '../../hooks/useIsJa';
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
  const { t } = useTranslation();
  const isJa = useIsJa();

  return (
    <Container>
      <MockupContainer>
        <Image
          width={289.44}
          height={430}
          src={isJa ? appleWatchMock : appleWatchEnMock}
          alt="TrainLCD"
          style={{ objectFit: 'contain' }}
        />
      </MockupContainer>
      <TextsContainer>
        <ShortHeading>{t('common:section.wearable.shortHeading')}</ShortHeading>
        {isJa ? (
          <Heading>
            <AccentText>{t('common:global.smartwatch')}</AccentText>
            <HeadingCaptionNumber>*3</HeadingCaptionNumber>
            <br />
            {t('common:section.wearable.alsoWorks')}
          </Heading>
        ) : (
          <Heading>
            {t('common:section.wearable.alsoWorks')}&nbsp;
            <AccentText>{t('common:global.smartwatch')}</AccentText>
            <HeadingCaptionNumber>*3</HeadingCaptionNumber>
          </Heading>
        )}
        <DescriptionText>
          {t('common:section.wearable.description')}
        </DescriptionText>
        <DisclaimerText>
          <sup>*3</sup>
          {t('common:section.wearable.disclaimer')}
        </DisclaimerText>
      </TextsContainer>
    </Container>
  );
};

export default WearableSection;
