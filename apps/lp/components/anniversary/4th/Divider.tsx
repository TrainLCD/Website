import React from 'react';
import styled from 'styled-components';

type Props = {
  white?: boolean;
};

const Divider: React.VFC<Props> = ({ white }) => (
  <DividerContainer>
    <DividerLine white={white} />
  </DividerContainer>
);

const DividerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 32px 0;
`;

const DividerLine = styled.span<{ white?: boolean }>`
  display: block;
  height: 2px;
  width: 64px;
  background-color: ${({ white }) => (white ? '#fff' : '#111')};
`;

export default Divider;
