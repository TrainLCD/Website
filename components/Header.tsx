import React from 'react';
import styled from 'styled-components';
import TinyKittenIcon from './TinyKittenIcon';

/*
.header {
}
.title {
}
*/

const HeaderContainer = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  height: 48px;
  background: #fff;
  z-index: 9999;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);

  @supports (
    (-webkit-backdrop-filter: blur(4px)) or (backdrop-filter: blur(4px))
  ) {
    background-color: rgba(255, 255, 255, 0.5);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
  }
`;

const TKContainer = styled.div``;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <TKContainer>
        <a
          href="https://tinykitten.me"
          target="_blank"
          rel="noreferrer noopener"
        >
          <TinyKittenIcon width={32} height={32} />
        </a>
      </TKContainer>
    </HeaderContainer>
  );
};

export default Header;
