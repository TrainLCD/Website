import React from 'react';
import styled from 'styled-components';

const Divider: React.VFC = () => (
  <DividerContainer>
    <DividerLine />
  </DividerContainer>
);

const DividerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 32px 0;
`;

const DividerLine = styled.span`
  display: block;
  height: 2px;
  width: 64px;
  background-color: #111;
`;

export default Divider;
