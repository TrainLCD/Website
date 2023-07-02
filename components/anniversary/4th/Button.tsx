import React from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../../../constants/media';

type Props = { children: React.ReactNode; onClick?: () => void };

const Button: React.VFC<Props> = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  appearance: none;
  background-color: #e94560;
  min-width: 150px;
  height: 40px;
  border: none;
  border-radius: 40px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  @media ${mediaQueries.md} {
    height: 48px;
  }
`;

export default Button;
