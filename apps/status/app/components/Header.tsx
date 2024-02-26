import React from "react";
import AppLogo from "./AppLogo";

// const AppInfoContainer = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
// `;

// const AppInfoAnchor = styled.span`
//   display: inline-flex;
//   align-items: center;
//   cursor: pointer;
//   text-decoration: none;
// `;

// const HeaderContainer = styled.header`
//   position: fixed;
//   top: 0;
//   height: 64px;
//   background: #fff;
//   z-index: 9999;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   border-bottom: 1px solid #ddd;
//   padding: 0 32px;
//   @media ${mediaQueries.md} {
//     padding: 0 64px;
//   }
// `;

// const AppTitle = styled.p`
//   margin-left: 8px;
//   font-weight: bold;
//   color: #444;
// `;

// const TryButtonContainer = styled.div``;

// const TryButton = styled.button`
//   appearance: none;
//   background-color: #277bc0;
//   width: 120px;
//   height: 40px;
//   border: none;
//   border-radius: 40px;
//   color: white;
//   font-weight: bold;
//   cursor: pointer;
//   @media ${mediaQueries.md} {
//     width: 180px;
//     height: 48px;
//   }
// `;

const Header: React.FC = () => {
  return (
    <header className="border-b h-16 md:px-16 p-4 flex flex-row items-center bg-white">
      <AppLogo className="size-8" />
      <p className="text-neutral-800 font-semibold ml-2 md:text-xl text-lg">
        Status
      </p>
    </header>
  );
};

export default Header;
