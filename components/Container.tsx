import styled from 'styled-components';

const Container = styled.div<{ odd?: boolean }>`
  padding: 32px 32px 128px 32px;
  background-color: ${({ odd }) => (odd ? '#fcfcfc' : 'inherit')};
`;

export default Container;
