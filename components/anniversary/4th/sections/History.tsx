import useTranslation from 'next-translate/useTranslation';
import styled from 'styled-components';
import { mediaQueries } from '../../../../constants/media';
import SectionHeader from '../SectionHeader';

const HistorySection: React.VFC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <SectionHeader
        title="HISTORY"
        subTitle={t('special:history.subTitle')}
        white
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #333;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;
  color: #333;
  overflow: hidden;
  padding: 32px;

  @media ${mediaQueries.md} {
    padding: 72px 128px;
  }
`;

export default HistorySection;
