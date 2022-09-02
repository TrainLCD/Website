import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import styled from 'styled-components';
import iPadEnMock from '../../assets/images/ipad-en.png';
import iPadMock from '../../assets/images/ipad.png';
import { Media, mediaQueries } from '../../constants/media';
import useIsJa from '../../hooks/useIsJa';
import { isJa } from '../../utils/isJa';

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
  white-space: pre-wrap;
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

const TextFragment = () => {
  const { t } = useTranslation();
  const isJa = useIsJa();

  return (
    <TextsContainer>
      <ShortHeading>{t('section.tablet.shortHeading')}</ShortHeading>
      {isJa ? (
        <Heading>
          <AccentText>iPad</AccentText>
          {t('section.tablet.canBeUsedWith')}
        </Heading>
      ) : (
        <Heading>
          {t('section.tablet.canBeUsedWith')} <AccentText>iPad</AccentText>
        </Heading>
      )}
      <DescriptionText>
        {t('section.tablet.description')}
        <DescriptionCaptionNumber>*2</DescriptionCaptionNumber>
      </DescriptionText>
      <DisclaimerText>
        <sup>*2</sup>
        {t('section.tablet.disclaimer')}
      </DisclaimerText>
    </TextsContainer>
  );
};

const MockupFragment = () => (
  <MockupContainer>
    <Image
      src={isJa ? iPadMock : iPadEnMock}
      alt="iPad"
      width={580}
      height={430.22}
    />
  </MockupContainer>
);

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
