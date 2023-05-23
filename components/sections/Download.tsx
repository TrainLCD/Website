import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import PlayStoreJPImg from '../../assets/images/store/google-play-jp.png';
import PlayStoreUSImg from '../../assets/images/store/google-play-us.png';
import { Media, mediaQueries } from '../../constants/media';
import useIsJa from '../../hooks/useIsJa';
import AppStoreJPIcon from '../AppStoreJPIcon';
import AppStoreUSIcon from '../AppStoreUSIcon';
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

const appStoreResizeMixin = css`
  width: 160px;
  height: 52.5px;
  margin-bottom: 21px;
  @media ${mediaQueries.md} {
    width: 320px;
    height: 113.07px;
    margin-bottom: 64px;
  }
`;
const ResizedAppStoreJPIcon = styled(AppStoreJPIcon)`
  ${appStoreResizeMixin}
`;
const ResizedAppStoreUSIcon = styled(AppStoreUSIcon)`
  ${appStoreResizeMixin}
`;

const DownloadSection: React.FC = () => {
  const { t } = useTranslation();
  const isJa = useIsJa();

  return (
    <Container id="download">
      <StoresContainer>
        <a
          href="https://apps.apple.com/jp/app/trainlcd/id1486355943"
          target="_blank"
          rel="noreferrer noopener"
        >
          {isJa ? <ResizedAppStoreJPIcon /> : <ResizedAppStoreUSIcon />}
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=me.tinykitten.trainlcd"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Media greaterThanOrEqual="lg">
            <Image
              width={310}
              height={95.32}
              objectFit="contain"
              src={isJa ? PlayStoreJPImg : PlayStoreUSImg}
            />
          </Media>
          <Media lessThan="lg">
            <Image
              width={140}
              height={47.66}
              objectFit="contain"
              src={isJa ? PlayStoreJPImg : PlayStoreUSImg}
            />
          </Media>
        </a>
      </StoresContainer>
      <TextsContainer>
        <ShortHeading>{t('section.dl.shortHeading')}</ShortHeading>
        {/* スペースの有無 */}
        {isJa ? (
          <Heading>
            iOS{t('section.dl.and')}Android
            <br />
            <AccentText>{t('section.dl.bothSupport')}</AccentText>
          </Heading>
        ) : (
          <Heading>
            iOS {t('section.dl.and')} Android
            <br />
            <AccentText>{t('section.dl.bothSupport')}</AccentText>
          </Heading>
        )}
        <DescriptionText>{t('section.dl.description')} </DescriptionText>
      </TextsContainer>
    </Container>
  );
};

export default DownloadSection;
