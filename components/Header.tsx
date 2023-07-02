import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../constants/media';
import AppLogo from './AppLogo';

const AppInfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const AppInfoAnchor = styled.span`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
`;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  height: 64px;
  background: #fff;
  z-index: 9999;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 0 32px;
  @media ${mediaQueries.md} {
    padding: 0 64px;
  }
`;

const AppTitle = styled.p`
  margin-left: 8px;
  font-weight: bold;
  color: #444;
`;

const LinkWithoutDecoration = styled(Link)`
  text-decoration: none;
  display: none;

  @media ${mediaQueries.md} {
    display: initial;
  }
`;

const AnniversaryText = styled.span`
  margin-left: 8px;
  font-weight: bold;
  color: #e94560;
  border: 2px solid #e94560;
  border-radius: 10px;
  padding: 6px 10px;
  cursor: pointer;
`;

const TryButtonContainer = styled.div``;

const TryButton = styled.button`
  appearance: none;
  background-color: #277bc0;
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 40px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  @media ${mediaQueries.md} {
    width: 180px;
    height: 48px;
  }
`;

const Header: React.FC = () => {
  const { t } = useTranslation();
  const handleTryButtonClick = () => {
    const aboutElem = document.querySelector('#download');
    window.scrollTo({
      top: aboutElem?.getBoundingClientRect().top,
      behavior: 'smooth',
    });
  };

  return (
    <HeaderContainer>
      <AppInfoContainer>
        <Link href="/" passHref>
          <AppInfoAnchor>
            <AppLogo width={25.26} height={32} />
            <AppTitle>TrainLCD</AppTitle>
          </AppInfoAnchor>
        </Link>
        <LinkWithoutDecoration href="/special">
          <AnniversaryText>TrainLCD 4th🎉</AnniversaryText>
        </LinkWithoutDecoration>
      </AppInfoContainer>
      <TryButtonContainer>
        <TryButton onClick={handleTryButtonClick}>
          {t('common:global.try')}
        </TryButton>
      </TryButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
