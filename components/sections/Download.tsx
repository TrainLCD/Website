import useTranslation from 'next-translate/useTranslation';
import styled from 'styled-components';
import AppStoreJPImg from '../../assets/images/store/app-store-jp.png';
import AppStoreUSImg from '../../assets/images/store/app-store-us.png';
import PlayStoreJPImg from '../../assets/images/store/google-play-jp.png';
import PlayStoreUSImg from '../../assets/images/store/google-play-us.png';
import { Media, mediaQueries } from '../../constants/media';
import useIsJa from '../../hooks/useIsJa';
import DescriptionText from '../DescriptionText';
import ImageWithoutSize from '../ImageWithoutSize';

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
const StoresContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

const StoreLink = styled.a`
  display: block;
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const DownloadSection: React.FC = () => {
  const { t } = useTranslation();
  const isJa = useIsJa();

  return (
    <Container id="download">
      <StoresContainer>
        <StoreLink
          href="https://apps.apple.com/jp/app/trainlcd/id1486355943"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Media greaterThanOrEqual="lg">
            <ImageWithoutSize
              alt="App Store"
              src={isJa ? AppStoreJPImg : AppStoreUSImg}
            />
          </Media>
          <Media lessThan="lg">
            <ImageWithoutSize
              alt="App Store"
              src={isJa ? AppStoreJPImg : AppStoreUSImg}
            />
          </Media>
        </StoreLink>
        <StoreLink
          href="https://play.google.com/store/apps/details?id=me.tinykitten.trainlcd"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Media greaterThanOrEqual="lg">
            <ImageWithoutSize
              alt="Play Store"
              src={isJa ? PlayStoreJPImg : PlayStoreUSImg}
            />
          </Media>
          <Media lessThan="lg">
            <ImageWithoutSize
              alt="Play Store"
              src={isJa ? PlayStoreJPImg : PlayStoreUSImg}
            />
          </Media>
        </StoreLink>
      </StoresContainer>
      <TextsContainer>
        <ShortHeading>{t('common:section.dl.shortHeading')}</ShortHeading>
        {/* スペースの有無 */}
        {isJa ? (
          <Heading>
            iOS{t('common:section.dl.and')}Android
            <br />
            <AccentText>{t('common:section.dl.bothSupport')}</AccentText>
          </Heading>
        ) : (
          <Heading>
            iOS {t('common:section.dl.and')} Android
            <br />
            <AccentText>{t('common:section.dl.bothSupport')}</AccentText>
          </Heading>
        )}
        <DescriptionText>{t('common:section.dl.description')} </DescriptionText>
      </TextsContainer>
    </Container>
  );
};

export default DownloadSection;
