import Image from 'next/image';
import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import AppleWatchMock from '../../../assets/images/applewatch.png';
import Android2K from '../../../assets/images/histories/android2k.png';
import LiveActivities from '../../../assets/images/histories/live_activities.png';
import TrainLCDClassicIcon from '../../../assets/images/histories/trainlcd_classic_icon.png';
import AntiqueTrainLCD from '../../../assets/images/histories/trainlcd_old.png';
import WearOSReal from '../../../assets/images/histories/wearos_real.jpg';
import { mediaQueries } from '../../../constants/media';
import { AppHistory } from '../../../models/History';

type Props = {
  history: AppHistory;
};

const PronamaVisualElement: React.VFC = () => (
  <YouTubeWrapper>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/zJ92TUjhdEw?start=15820"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  </YouTubeWrapper>
);

const BornVisualElement: React.VFC = () => (
  <VisualElementImage
    src={AntiqueTrainLCD}
    alt="Antique TrainLCD"
    width={626}
    height={352}
  />
);

const StoreDebutVisualElement: React.VFC = () => (
  <VisualElementImage
    src={TrainLCDClassicIcon}
    alt="Banner"
    width={626}
    height={626}
  />
);

const AppleWatchVisualElement: React.VFC = () => (
  <VisualElementImage
    src={AppleWatchMock}
    alt="Apple Watch"
    width={626}
    height={930}
  />
);

const LiveActivitiesVisualElement: React.VFC = () => (
  <VisualElementImage
    src={LiveActivities}
    alt="Live Activities"
    width={626}
    height={1357}
  />
);

const Android2KDevicesVisualElement: React.VFC = () => (
  <VisualElementImage
    src={Android2K}
    alt="TrainLCD has reached 2K devices"
    width={626}
    height={1391}
  />
);

const WearOSVisualElement: React.VFC = () => (
  <VisualElementImage
    src={WearOSReal}
    alt="Wear OS Demonstration"
    width={626}
    height={831}
  />
);

const VisualElements: Record<AppHistory['slug'], React.VFC> = {
  pronama: PronamaVisualElement,
  born: BornVisualElement,
  storeDebut: StoreDebutVisualElement,
  appleWatch: AppleWatchVisualElement,
  liveActivities: LiveActivitiesVisualElement,
  android2k: Android2KDevicesVisualElement,
  wearos: WearOSVisualElement,
};

const HistoryPanel: React.VFC<Props> = ({ history }) => {
  const eventDate = useMemo(() => {
    if (!history.endDate) {
      return history.startDate;
    }
    return `${history.startDate} - ${history.endDate}`;
  }, [history.endDate, history.startDate]);

  const VisualElement = useMemo(() => VisualElements[history.slug], [
    history.slug,
  ]);

  return (
    <Container>
      <InfoContainer>
        <Time>{eventDate}</Time>
        <Heading>{history.heading} </Heading>
        <Description>{history.description} </Description>
      </InfoContainer>
      <VisualContainer>
        <VisualElement />
      </VisualContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  top: 0;
  left: 0;
  flex-direction: column-reverse;
  height: 100%;

  :nth-child(odd) {
    background-color: #fafafa;
  }

  @media ${mediaQueries.md} {
    flex-direction: row;
    min-height: 100vh;
  }
`;

const containerMixin = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;

  @media ${mediaQueries.md} {
    width: 50%;
    min-height: 100vh;
  }
`;
const InfoContainer = styled.div`
  ${containerMixin};
  padding: 32px;
  color: #333;

  @media ${mediaQueries.md} {
    padding: 72px 128px;
  }
`;

const Time = styled.time`
  margin-bottom: 4px;
  font-size: 1rem;
  font-weight: bold;
`;
const Heading = styled.h3`
  font-size: 1.5rem;
  white-space: pre-wrap;

  @media ${mediaQueries.md} {
    font-size: 2rem;
  }
`;
const Description = styled.p`
  margin-top: 16px;
  font-size: 1rem;
  line-height: 2;
  white-space: pre-wrap;
`;

const VisualContainer = styled.div`
  ${containerMixin};
  align-items: center;
  padding: 32px;

  @media ${mediaQueries.md} {
    padding: 72px 128px;
  }
`;

const YouTubeWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const VisualElementImage = styled(Image)<{ width: number; height: number }>`
  object-fit: contain;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
  width: ${({ width }) => width / 3}px;
  height: ${({ height }) => height / 3}px;
  @media ${mediaQueries.md} {
    width: ${({ width }) => width / 2}px;
    height: ${({ height }) => height / 2}px;
  }
`;

export default HistoryPanel;