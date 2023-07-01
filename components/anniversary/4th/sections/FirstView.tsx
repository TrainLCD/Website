import { SpringValue, a } from '@react-spring/web';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import mockImage from '../../../../assets/images/mockup/iphone-and-ipad.png';
import { mediaQueries } from '../../../../constants/media';

const FirstView: React.VFC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [firstAnimationCompleted, setFirstAnimationCompleted] = useState(false);
  const textMarginBottom = useMemo(() => new SpringValue('-100%'), []);
  const downloadButtonBottom = useMemo(() => new SpringValue('-48px'), []);
  const downloadButtonOpacity = useMemo(() => new SpringValue(0), []);
  const mockupImageOpacity = useMemo(() => new SpringValue(0), []);

  useEffect(() => {
    if (!firstAnimationCompleted) {
      textMarginBottom.start('common:0%');
      setTimeout(() => {
        downloadButtonBottom.start('common:0px');
        downloadButtonOpacity.start(1);
      }, 500);
      setTimeout(() => {
        mockupImageOpacity.start(1);
      }, 1000);
      setFirstAnimationCompleted(true);
    }
  }, [
    downloadButtonBottom,
    downloadButtonOpacity,
    firstAnimationCompleted,
    mockupImageOpacity,
    textMarginBottom,
  ]);

  const handleDownloadButtonClick = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <Container>
      <ContentContainer>
        <ContentTextsContainer>
          <SpringContainer>
            <ContentTitle style={{ marginBottom: textMarginBottom }}>
              TrainLCD{' '}
              <ContentTitleLargeModifier>4th</ContentTitleLargeModifier>{' '}
              Anniversary🎉
            </ContentTitle>
          </SpringContainer>
          <SpringContainer>
            <ContentText style={{ marginBottom: textMarginBottom }}>
              {t('special:firstView.greeting')}
            </ContentText>
          </SpringContainer>
          <DownloadButtonContainer>
            <DownloadButton
              style={{
                bottom: downloadButtonBottom,
                opacity: downloadButtonOpacity,
              }}
              onClick={handleDownloadButtonClick}
            >
              {t('common:global.download')}
            </DownloadButton>
          </DownloadButtonContainer>
        </ContentTextsContainer>

        <MockupImageContainer>
          <MockupImage
            style={{
              opacity: mockupImageOpacity,
              width: 626.19,
              height: 440,
            }}
            src={mockImage}
            alt="iPhone and iPad"
            priority
          />
        </MockupImageContainer>
      </ContentContainer>

      <BGContainer>
        <BGImage
          src="/anniversary/4th/bg/fukuoka.jpg"
          fill
          alt="Background image"
        />
        <ImageOverlay />
      </BGContainer>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: #444;
`;

const ContentContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 32px;
  z-index: 1;

  @media ${mediaQueries.md} {
    flex-direction: row;
    justify-content: space-between;
    padding: 48px;
  }
`;

const SpringContainer = styled.div`
  overflow: hidden;
`;

const ContentTextsContainer = styled.div`
  max-width: 720px;
`;

const ContentTitle = styled(a.h2)`
  color: white;
  font-size: 2rem;
  max-width: 100%;
  margin-bottom: -100%;

  @media ${mediaQueries.md} {
    font-size: 3rem;
  }
`;

const ContentText = styled(a.p)`
  color: white;
  max-width: 100%;
  margin-top: 8px;
  line-height: 1.75;
  opacity: 0.75;
  margin-bottom: -100%;
`;

const ContentTitleLargeModifier = styled.span`
  font-size: 2.5rem;
  color: #e94560;

  @media ${mediaQueries.md} {
    font-size: 4rem;
  }
`;

const BGContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const BGImage = styled(Image)`
  position: fixed;
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
`;

const DownloadButtonContainer = styled.div`
  display: none;

  @media ${mediaQueries.md} {
    display: block;
    position: relative;
    overflow: hidden;
    height: 48px;
    margin-top: 32px;
  }
`;

const DownloadButton = styled(a.button)`
  display: block;
  position: absolute;
  appearance: none;
  background-color: #e94560;
  width: 180px;
  height: 48px;
  border: none;
  border-radius: 40px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  bottom: -48px;
  opacity: 0;
`;

const MockupImageContainer = styled(a.div)`
  margin-top: 32px;
  overflow: hidden;

  @media ${mediaQueries.md} {
    margin-top: 0;
  }
`;

const MockupImage = styled(a(Image))`
  opacity: 0;
  object-fit: contain;
`;

export default FirstView;
