import useTranslation from 'next-translate/useTranslation';
import { useMemo, useRef } from 'react';
import styled from 'styled-components';
import historiesEn from '../../../../assets/fixture/histories.en.json';
import historiesJa from '../../../../assets/fixture/histories.ja.json';
import { mediaQueries } from '../../../../constants/media';
import useIsJa from '../../../../hooks/useIsJa';
import { AppHistory } from '../../../../models/History';
import HistoryPanel from '../HistoryPanel';
import SectionHeader from '../SectionHeader';

const HistorySection: React.VFC = () => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const isJa = useIsJa();

  const histories = useMemo(() => (isJa ? historiesJa : historiesEn), [isJa]);

  return (
    <Container ref={ref}>
      <SectionHeaderContainer>
        <SectionHeader
          title="HISTORY"
          subTitle={t('special:history.subTitle')}
        />
      </SectionHeaderContainer>
      {histories.map((history: AppHistory) => (
        <HistoryPanel history={history} key={history.slug} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #f0f0f0;
  z-index: 1;
  overflow: hidden;
`;
const SectionHeaderContainer = styled.div`
  padding: 32px;

  @media ${mediaQueries.md} {
    padding: 72px 128px;
  }
`;

export default HistorySection;
