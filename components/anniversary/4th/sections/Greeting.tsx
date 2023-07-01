import useTranslation from 'next-translate/useTranslation';
import { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../../../../constants/media';
import useScreenVisibility from '../../../../hooks/useScreenVisibility';
import Divider from '../Divider';

type Props = { onVisibilityChange: (visible: boolean) => void };

const GreetingSection: React.VFC<Props> = ({ onVisibilityChange }) => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useScreenVisibility(ref);
  const { t } = useTranslation();

  useEffect(() => {
    onVisibilityChange(visible);
  }, [onVisibilityChange, visible]);

  const hasSubtitle = useMemo(
    () =>
      t('special:greeting.subTitle') !== '4thspecial:greeting.subTitle' ||
      !t('special:greeting.subTitle').length,
    [t]
  );

  return (
    <Container>
      <ContentContainer>
        <TitleContainer>
          <SectionTitle>GREETING</SectionTitle>
          {hasSubtitle && (
            <SectionSubTitle>{t('special:greeting.subTitle')}</SectionSubTitle>
          )}
        </TitleContainer>
        <Divider />
        <DescriptionContainer>
          <DescriptionTitle>{t('special:greeting.heading')}</DescriptionTitle>
          <DescriptionText>{t('special:greeting.message')}</DescriptionText>
          <CaptionText>
            *1: {t('special:greeting.caption1')}
            <br />
            *2: {t('special:greeting.caption2')}
          </CaptionText>
        </DescriptionContainer>
      </ContentContainer>
      <ViewIntersectPoint ref={ref} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #fafafa;
  z-index: 1;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 32px;
  z-index: 1;
  left: 0;
  top: 0;
  color: #333;
  overflow: hidden;

  @media ${mediaQueries.md} {
    padding: 72px 128px;
  }
`;

const TitleContainer = styled.div`
  color: #111;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  letter-spacing: 0.25rem;
  font-weight: bold;
`;

const SectionSubTitle = styled.h3`
  font-size: 1rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
`;

const DescriptionContainer = styled.div`
  margin-top: 16px;
  font-weight: lighter;
`;

const DescriptionTitle = styled.p`
  font-size: 2rem;
  letter-spacing: 0.1rem;

  @media ${mediaQueries.md} {
    font-size: 3rem;
    letter-spacing: 0.25rem;
  }
`;

const DescriptionText = styled.p`
  margin-top: 32px;
  font-size: 0.9rem;
  line-height: 2;
  @media ${mediaQueries.md} {
    font-size: 1rem;
  }
`;

const CaptionText = styled.small`
  display: block;
  margin-top: 24px;
  line-height: 2;
  font-size: 0.75rem;
`;

const ViewIntersectPoint = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0;
`;

export default GreetingSection;
