import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../../../constants/media';
import Button from './Button';
import SpecialLogo from './Logo';

const InfoContainer = styled.div<{ fvPassed: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${({ fvPassed }) => (fvPassed ? '#444' : '#fff')};
`;

const HeaderContainer = styled.header<{ fvPassed: boolean }>`
  position: fixed;
  top: 0;
  height: 64px;
  z-index: 9999;
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: ${({ fvPassed }) => fvPassed && '0 4px 4px rgba(0, 0, 0, 0.16)'};
  padding: 0 32px;
  backdrop-filter: blur(12px);
  background-color: ${({ fvPassed }) => (fvPassed ? '#fff' : 'transparent')};

  transition: 0.5s ease;
  @media ${mediaQueries.md} {
    padding: 0 64px;
  }
`;

const PageTitle = styled.p`
  font-weight: bold;
`;

const PageTitleSub = styled.p`
  font-size: 0.8rem;
  text-align: center;
  line-height: 0.8rem;
`;

const TitleContainer = styled.div`
  margin-left: 8px;
`;

type Props = {
  firstViewPassed: boolean;
};

const SpecialHeader: React.FC<Props> = ({ firstViewPassed }) => {
  const { t } = useTranslation();

  const router = useRouter();

  const handleDownloadButtonClick = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <HeaderContainer fvPassed={firstViewPassed}>
      <InfoContainer fvPassed={firstViewPassed}>
        <SpecialLogo width={25.26} height={32} />
        <TitleContainer>
          <PageTitle>
            <small>TrainLCD</small> 4th
          </PageTitle>
          <PageTitleSub>Special Website</PageTitleSub>
        </TitleContainer>
      </InfoContainer>
      <Button onClick={handleDownloadButtonClick}>
        {t('common:global.download')}
      </Button>
    </HeaderContainer>
  );
};

export default SpecialHeader;
