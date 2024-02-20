import useTranslation from 'next-translate/useTranslation';
import styled from 'styled-components';
import iPadEnMock from '../../assets/images/ipad-en.png';
import iPadMock from '../../assets/images/ipad.png';
import { Media, mediaQueries } from '../../constants/media';
import useIsJa from '../../hooks/useIsJa';
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
  const { t } = useTranslation();
  const isJa = useIsJa();

  return (
    <TextsContainer>
      <ShortHeading>{t('common:section.tablet.shortHeading')}</ShortHeading>
      {isJa ? (
        <Heading>
          <AccentText>iPad</AccentText>
          {t('common:section.tablet.canBeUsedWith')}
        </Heading>
      ) : (
        <Heading>
          {t('common:section.tablet.canBeUsedWith')}{' '}
          <AccentText>iPad</AccentText>
        </Heading>
      )}
      <DescriptionText>
        {t('common:section.tablet.description')}
        <DescriptionCaptionNumber>*2</DescriptionCaptionNumber>
      </DescriptionText>
      <DisclaimerText>
        <sup>*2</sup>
        {t('common:section.tablet.disclaimer')}
      </DisclaimerText>
    </TextsContainer>
  );
};

const MockupFragment = () => {
  const isJa = useIsJa();
  return (
    <MockupContainer>
      <ImageWithoutSize src={isJa ? iPadMock : iPadEnMock} alt="iPad" />
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
