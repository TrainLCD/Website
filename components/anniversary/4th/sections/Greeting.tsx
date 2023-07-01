import useTranslation from 'next-translate/useTranslation';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../../../../constants/media';
import useScreenVisibility from '../../../../hooks/useScreenVisibility';
import Avatar from '../Avatar';
import SectionHeader from '../SectionHeader';

type Props = { onVisibilityChange: (visible: boolean) => void };

const GreetingSection: React.VFC<Props> = ({ onVisibilityChange }) => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useScreenVisibility(ref);
  const { t } = useTranslation();

  useEffect(() => {
    onVisibilityChange(visible);
  }, [onVisibilityChange, visible]);

  return (
    <Container>
      <ContentContainer>
        <SectionHeader
          title="GREETING"
          subTitle={t('special:greeting.subTitle')}
        />
        <DescriptionContainer>
          <div>
            <DescriptionTitle>{t('special:greeting.heading')}</DescriptionTitle>
            <DescriptionText>{t('special:greeting.message')}</DescriptionText>
            <CaptionText>
              *1: {t('special:greeting.caption1')}
              <br />
              *2: {t('special:greeting.caption2')}
            </CaptionText>
          </div>
          <AvatarContainer>
            <ResizedAvatar />
          </AvatarContainer>
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
  z-index: 1;
  color: #333;
  overflow: hidden;
  padding: 32px;

  @media ${mediaQueries.md} {
    padding: 72px 128px;
  }
`;

const AvatarContainer = styled.div`
  display: none;
  @media ${mediaQueries.md} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ResizedAvatar = styled(Avatar)`
  max-width: 100%;
  width: 256px;
  height: 256px;
  margin-left: 32px;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.25));
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
