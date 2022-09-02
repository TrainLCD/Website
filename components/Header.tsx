import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../constants/media';
import { isJa } from '../utils/isJa';
import AppLogo from './AppLogo';

const AppInfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const AppInfoAnchor = styled.a`
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
      </AppInfoContainer>
      <TryButtonContainer>
        <TryButton onClick={handleTryButtonClick}>
          {isJa ? '使ってみる' : 'Try TrainLCD'}
        </TryButton>
      </TryButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
