import useTranslation from 'next-translate/useTranslation';
import styled from 'styled-components';
import mockImage from '../../assets/images/mockup/iphone-and-ipad.png';
import { Media, mediaQueries } from '../../constants/media';
import useIsJa from '../../hooks/useIsJa';
import ImageWithoutSize from '../ImageWithoutSize';
import RingsPC from '../RingsPC';
import RingsSP from '../RingsSP';

const Container = styled.section`
  min-height: 100vh;
  position: relative;
  padding: 0 32px;
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  @media ${mediaQueries.md} {
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 0;
    padding: 0 64px;
  }
`;

const TextsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 32px;
  @media ${mediaQueries.md} {
    flex: 1;
    height: 100%;
    margin-bottom: 80px;
  }
`;

const ColoredText = styled.span`
  color: #277bc0;
`;

const Heading = styled.h2<{ isJa: boolean }>`
  line-height: ${({ isJa }) => (isJa ? 1.25 : 1.15)};
  font-size: 1.5rem;
  @media ${mediaQueries.md} {
    font-size: 3rem;
  }
`;

const DescriptionText = styled.p<{ en?: boolean }>`
  line-height: 1.5;
  font-weight: ${({ en }) => (en ? 'normal' : 'bold')};
  color: #212121;
  margin-top: 12px;
  white-space: pre-wrap;
  font-size: 0.75rem;

  @media ${mediaQueries.md} {
    color: #444;
    font-size: 1rem;
  }
`;

const MockupContainer = styled.div`
  position: relative;
  flex-direction: column;

  @media ${mediaQueries.md} {
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 0.75;
  }
`;

const StyledRingsPC = styled(RingsPC)`
  position: absolute;
  right: -64px;
  bottom: -32px;
  z-index: 0;
`;

const StyledRingsSP = styled(RingsSP)`
  position: absolute;
  right: -32px;
  top: -32px;
  z-index: 0;
`;

const TryButton = styled.button`
  appearance: none;
  background-color: #277bc0;
  width: 180px;
  height: 48px;
  border: none;
  border-radius: 48px;
  color: white;
  font-weight: bold;
  margin-top: 32px;
  cursor: pointer;
`;

const WelcomeSection: React.FC = () => {
  const { t } = useTranslation();
  const handleTryButtonClick = () => {
    const aboutElem = document.querySelector('#download');
    window.scrollTo({
      top: aboutElem?.getBoundingClientRect().top,
      behavior: 'smooth',
    });
  };
  const isJa = useIsJa();

  return (
    <Container>
      <TextsContainer>
        <Heading isJa={isJa}>
          {t('common:section.welcome.canBeUsed')}
          <br />
          <ColoredText>{t('common:section.welcome.newSense')}</ColoredText>
          {!isJa && ' '}
          <span>{t('common:section.welcome.navigationApp')}</span>
        </Heading>
        <DescriptionText en={!isJa}>
          {t('common:section.welcome.description')}
        </DescriptionText>
        <Media greaterThanOrEqual="lg">
          <TryButton onClick={handleTryButtonClick}>
            {t('common:global.try')}
          </TryButton>
        </Media>
      </TextsContainer>
      <MockupContainer>
        <Media greaterThanOrEqual="lg">
          <StyledRingsPC />
        </Media>
        <Media lessThan="lg">
          <StyledRingsSP />
        </Media>
        <ImageWithoutSize src={mockImage} alt="iPhone and iPad" fill />
      </MockupContainer>
      <Media lessThan="lg">
        <TryButton onClick={handleTryButtonClick}>
          {t('common:global.try')}
        </TryButton>
      </Media>
    </Container>
  );
};

export default WelcomeSection;
