import React from 'react';
import styled from 'styled-components';
import { isJa } from '../utils/isJa';
import AppLogo from './AppLogo';

const AppInfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const HeaderContainer = styled.header`
  position: fixed;
  height: 64px;
  background: #fff;
  z-index: 9999;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 0 64px;
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
  width: 180px;
  height: 48px;
  border: none;
  border-radius: 48px;
  color: white;
  font-weight: bold;
  cursor: pointer;
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
        <AppLogo width={37.89} height={48} />
        <AppTitle>TrainLCD</AppTitle>
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
