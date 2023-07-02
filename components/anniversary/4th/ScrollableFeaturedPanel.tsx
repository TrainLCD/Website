// import debounce from 'lodash/debounce';
// import throttle from 'lodash/throttle';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import usePreventScroll from '../../../hooks/usePreventScroll';
import useScreenVisibility from '../../../hooks/useScreenVisibility';

type ParentPanelProps = {
  index: number;
  heading: string;
  description: string;
};

const ParentPanel: React.VFC<ParentPanelProps> = ({
  index,
  heading,
  description,
}) => {
  return (
    <PanelsContainer key={index}>
      <LeftPanel heading={heading} description={description} />
      <RightPanel />
    </PanelsContainer>
  );
};

type LeftPanelProps = Pick<ParentPanelProps, 'heading' | 'description'>;

const LeftPanel: React.VFC<LeftPanelProps> = ({ heading, description }) => {
  return (
    <LeftPanelContainer>
      <FeatureHeading>{heading}</FeatureHeading>
      <FeatureDescription>{description}</FeatureDescription>
    </LeftPanelContainer>
  );
};

const LeftPanelContainer = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 128px;
  color: #fff;
  background-color: #333;
`;

const FeatureHeading = styled.h3`
  font-size: 3rem;
`;
const FeatureDescription = styled.p`
  margin-top: 32px;
`;

const RightPanel: React.VFC = () => {
  return <RightPanelContainer></RightPanelContainer>;
};

const RightPanelContainer = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #111;
`;

type Props = { slides: string[] };

// 値を大きくするとキャプチャされやすくなる
// 値が大きくするとスクロール処理を遅くできる
const BUFFER_DIVIDE_BY = 10;

const ScrollableFeaturedPanel: React.VFC<Props> = ({ slides }) => {
  const ref = useRef(null);
  const [activeIndexBuffer, setActiveIndexBuffer] = useState(0);
  const [shouldPreventScroll, setShouldPreventScroll] = useState(false);

  const handleScrollDetect = useCallback(
    (direction: 'up' | 'down') => {
      setActiveIndexBuffer((prev) => {
        const dividedPrev = Math.floor(prev / BUFFER_DIVIDE_BY);
        const dividedNext = dividedPrev + 1;
        switch (direction) {
          case 'up': {
            if (dividedPrev <= 0) {
              return prev;
            }
            return prev - 1;
          }
          case 'down': {
            if (dividedNext === slides.length) {
              setShouldPreventScroll(true);
              return prev;
            }
            return prev + 1;
          }
          default:
            return prev;
        }
      });
    },
    [slides.length]
  );

  const activeIndex = useMemo(() => {
    const int = Math.floor(activeIndexBuffer / BUFFER_DIVIDE_BY);
    return int;
  }, [activeIndexBuffer]);

  const slicedSlides = useMemo(() => slides.slice(0, activeIndex + 1), [
    activeIndex,
    slides,
  ]);

  const visible = useScreenVisibility(ref);

  useEffect(() => {
    if (!visible) {
      setShouldPreventScroll(false);
      return;
    }
    if (activeIndex === 0 || activeIndex === slides.length - 1) {
      setShouldPreventScroll((prev) => !prev);
      return;
    }
    if (activeIndex <= slides.length - 1) {
      setShouldPreventScroll(true);
      return;
    }

    setShouldPreventScroll(false);
    return;
  }, [activeIndex, slides.length, visible]);

  usePreventScroll(shouldPreventScroll, handleScrollDetect);

  return (
    <RootContainer>
      {slicedSlides.map((key, index) => (
        <ParentPanel
          index={index}
          heading={`heading_${key}`}
          description={`description_${key}`}
          key={key}
        />
      ))}
      <ViewIntersectPoint ref={ref} />
    </RootContainer>
  );
};

const RootContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const PanelsContainer = styled.div`
  position: absolute;
  display: flex;
`;

const ViewIntersectPoint = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  left: 0;
  top: 50%;
  bottom: 50%;
  z-index: -1;
`;

export default ScrollableFeaturedPanel;
