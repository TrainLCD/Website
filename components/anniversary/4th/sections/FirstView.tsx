import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';
import mockImage from '../../../../assets/images/mockup/iphone-and-ipad.png';
import { mediaQueries } from '../../../../constants/media';

const FirstView: React.VFC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleDownloadButtonClick = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <Container>
      <ContentContainer>
        <ContentTextsContainer>
          <SpringContainer>
            <ContentTitle>
              TrainLCD{' '}
              <ContentTitleLargeModifier>4th</ContentTitleLargeModifier>{' '}
              Anniversary🎉
            </ContentTitle>
          </SpringContainer>
          <SpringContainer>
            <ContentText>{t('special:firstView.greeting')}</ContentText>
          </SpringContainer>
          <DownloadButtonContainer>
            <DownloadButton onClick={handleDownloadButtonClick}>
              {t('common:global.download')}
            </DownloadButton>
          </DownloadButtonContainer>
        </ContentTextsContainer>

        <MockupImageContainer>
          <MockupImage
            style={{
              width: 626.19,
              height: 'auto',
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
  position: absolute;
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

const ContentTextsContainer = styled.div``;

const ContentTitle = styled.h2`
  color: white;
  font-size: 2rem;
  max-width: 100%;

  @media ${mediaQueries.md} {
    font-size: 3rem;
  }
`;

const ContentText = styled.p`
  color: white;
  max-width: 100%;
  margin-top: 8px;
  line-height: 1.75;
  opacity: 0.75;
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
  position: absolute;
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

const DownloadButton = styled.button`
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
`;

const MockupImageContainer = styled.div`
  overflow: hidden;

  @media ${mediaQueries.md} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0;
  }
`;

const MockupImage = styled(Image)`
  object-fit: contain;
`;

export default FirstView;
