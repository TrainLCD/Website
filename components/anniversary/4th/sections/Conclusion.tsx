import useTranslation from 'next-translate/useTranslation';
import { useRef } from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../../../../constants/media';
import Button from '../Button';
import SectionHeader from '../SectionHeader';

const ConclusionSection: React.VFC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  return (
    <Container>
      <ContentContainer>
        <SectionHeader
          title="THANK YOU"
          subTitle={t('special:conclusion.subTitle')}
        />
        <DescriptionContainer>
          <div>
            <DescriptionTitle>
              {t('special:conclusion.heading')}
            </DescriptionTitle>
            <DescriptionText>{t('special:conclusion.message')}</DescriptionText>
            <DownloadButtonContainer>
              <Button> {t('common:global.download')}</Button>
            </DownloadButtonContainer>
          </div>
        </DescriptionContainer>
      </ContentContainer>
      <ViewIntersectPoint ref={ref} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  background-color: #fafafa;
  z-index: 1;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  z-index: 1;
  color: #333;
  overflow: hidden;
  padding: 32px;

  @media ${mediaQueries.md} {
    padding: 72px 128px;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const DescriptionTitle = styled.p`
  font-size: 2rem;
  letter-spacing: 0.1rem;
  font-weight: bold;

  @media ${mediaQueries.md} {
    font-size: 3rem;
  }
`;

const DescriptionText = styled.p`
  margin-top: 32px;
  font-size: 0.9rem;
  line-height: 2;
  white-space: pre-wrap;
  width: 100%;
  @media ${mediaQueries.md} {
    font-size: 1rem;
  }
`;

const DownloadButtonContainer = styled.div`
  margin-top: 16px;
`;

const ViewIntersectPoint = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0;
`;

export default ConclusionSection;
